---
layout: base.njk
title: Set up dev env for Windows
date: 2022-07-27
---

## Windows Terminal

A terminal/console/CLI app.

- [Windows Terminal - Microsoft Store Apps](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)

> The Windows Terminal is a modern, fast, efficient, powerful, and productive terminal application for users of command-line tools and shells like Command Prompt, PowerShell, and WSL. Its main features include multiple tabs, panes, Unicode and UTF-8 character support, a GPU accelerated text rendering engine, and custom themes, styles, and configurations.

If you use Windows 11, this has been installed from the beginning.

## WinGet

A package manager app for Windows by Microsoft.

Installed from the beginning.

```
>winget --help
```

## Clink

A shell that enables common keyboard operations: `Ctrl+R`, `Ctrl+W`, etc.

- [Overview | Clink](https://chrisant996.github.io/clink/)

> Clink combines the native Windows shell cmd.exe with the powerful command line editing features of the GNU Readline library, which provides rich completion, history, and line-editing capabilities. Readline is best known for its use in the Unix shell Bash, the standard shell for Mac OS X and many Linux distributions.

To install, on your terminal:

```
>winget install clink
```

To uninstall:

```
>winget uninstall clink
```

### mridgers's Clink vs chrisant996's Clink

Use chrisant996's one.

Clink is originally created by [mridgers](http://mridgers.github.io/clink/), but not maintained today.

## Gow

A command set that provides Linux-like ones.

- [Home · bmatzelle/gow Wiki](https://github.com/bmatzelle/gow/wiki)

> Gow (Gnu On Windows) is the lightweight alternative to Cygwin. It uses a convenient NSIS installer that installs over 100 extremely useful open source UNIX applications compiled as native win32 binaries. It is designed to be as small as possible, about 18 MB, as opposed to Cygwin which can run well over 100 MB depending upon options.

It includes `ls`, `pwd`, `vim`

To install, on your terminal:

```
>winget install gow
```

To uninstall:

```
>winget uninstall gow
```

## WSL (Windows Subsystem for Linux)

A kind of Linux virtual machine for Windows by Microsoft.

- [Windows Subsystem for Linux Documentation | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/)

> Windows Subsystem for Linux (WSL) lets developers run a GNU/Linux environment -- including most command-line tools, utilities, and applications -- directly on Windows, unmodified, without the overhead of a traditional virtual machine or dual-boot setup.

It's not a virtual machine as our tech term though.

Don't really remember how to set up WSL itself, but you have to install a distribution. For example, here is Ubuntu.

- [Ubuntu - Microsoft Store Apps](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV)
