---
layout: base.njk
title: AWS EC2 tips
date: 2022-07-19
---

- https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:

## Instance name

Instance list > the row > the column > hover your mouse and press the edit button

## Consistent IP address

1. Open an instance detail page
2. Side bar > Network & Security > Elastic IPs
3. Allocate Elastic IP address at top right
4. Select the new one
5. Actions (at top right) > Associate Elastic IP address

## Ports and firewall

1. Instance details > Security > Security groups > the one
2. Edit inbound rules > Add rules

## Disk size

1. Instance details > Storage > Block devices > the one
2. Open the volume
3. Modify (right top)
4. Update "Size (GiB)"
5. Follow the instruction: [Extend a Linux file system after resizing a volume - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)

```
$ sudo growpart /dev/nvme0n1 1
$ sudo xfs_growfs -d /
$ sudo xfs_growfs -d /data
```
