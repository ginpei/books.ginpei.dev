---
layout: base.njk
title: Linux tips
date: 2022-07-19
---

なんか忘れがちなもの。

## ディスク容量

### ファイルシステム全体

```
$ df -h
Filesystem        Size  Used Avail Use% Mounted on
devtmpfs          1.9G     0  1.9G   0% /dev
tmpfs             1.9G     0  1.9G   0% /dev/shm
tmpfs             1.9G  432K  1.9G   1% /run
tmpfs             1.9G     0  1.9G   0% /sys/fs/cgroup
/dev/nvme0n1p1    8.0G  5.3G  2.8G  66% /
/dev/nvme0n1p128   10M  3.8M  6.3M  38% /boot/efi
tmpfs             386M     0  386M   0% /run/user/1000
```

### ディレクトリー単位

```
$ du -BM -d1
2M      ./.git
169M    ./packages
408M    ./node_modules
579M    .
```

## スワップメモリー

```
$ sudo mkdir /swaps
$ sudo dd if=/dev/zero of=/swaps/1 bs=1M count=2048
$ sudo mkswap /swaps/1
$ sudo chmod 0600 /swaps/1
$ sudo swapon /swaps/1
```

確認。

```
$ cat /proc/swaps
Filename                                Type            Size            Used            Priority
/swaps/1                                file            2097148         0               -2
```

永続化するため設定に 1 行追加。

```
$ sudo vi /etc/fstab
```

```
/swaps/1          swap                    swap    defaults        0 0
```

## `make` の準備

> make: g++: Command not found

```
$ sudo yum groupinstall -y 'Development Tools'
```

## VS Code でファイル監視数上限撤廃

- https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc

ポップアップでこんなエラーが出てくるかも。
あるいはコンソール。

> Warning: ENOSPC: System limit for number of file watchers reached, watch '/path/to/files/'

リンク先の指示に従い作業する。

```
$ cat /proc/sys/fs/inotify/max_user_watches
$ sudo vi /etc/sysctl.conf
```

```
fs.inotify.max_user_watches=524288
```

```
$ sudo sysctl -p
```

## モニタリング

CPU やメモリーの利用状況が見える。
`top` より格好良い。

```
$ sudo yum install htop -y
$ htop
```

`q` を押すと終了。

## HTTPS

- [Tutorial: Configure SSL/TLS on Amazon Linux 2 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html#letsencrypt)

1. HTTP 用ポート (80) を開いておく
2. certbot をインストール
3. キーを取得

```
$ cd ~
$ sudo wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
$ sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
$ sudo yum-config-manager --enable epel*
$ sudo yum repolist all
$ sudo yum install -y certbot
$ sudo certbot certonly --register-unsafely-without-email -- standalone -d xxx.example.com
```

`certbot` のオプション `--register-unsafely-without-email` は開発用。本番では使用しない。

出てくるファイルの例：

```
$ sudo ls -l /etc/letsencrypt/live/xxx.example.com/
total 4
lrwxrwxrwx 1 root root  38 Dec  4 21:29 cert.pem -> ../../archive/xxx.example.com/cert1.pem
lrwxrwxrwx 1 root root  39 Dec  4 21:29 chain.pem -> ../../archive/xxx.example.com/chain1.pem
lrwxrwxrwx 1 root root  43 Dec  4 21:29 fullchain.pem -> ../../archive/xxx.example.com/fullchain1.pem
lrwxrwxrwx 1 root root  41 Dec  4 21:29 privkey.pem -> ../../archive/xxx.example.com/privkey1.pem
-rw-r--r-- 1 root root 692 Dec  4 21:29 README
```

実装例。

```js
const express = require('express')
const https = require('https')
const fs = require('fs')

const PORT = 8080;

const app = express();
app.get('/', (req, res) => res.send('OK'));

// you have to copy these 2 files and set permission
const httpsOptions = {
  cert: fs.readFileSync('keys/cert.pem'),
  key: fs.readFileSync('keys/privkey.pem'),
};
const server = https.createServer(httpsOptions, app);
server.listen(PORT, () => console.log(`Port: ${PORT}`));
```
