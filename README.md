box
====

A simple CLI [Dropbox](https://www.dropbox.com) client for environments where resources are scarce.

background
====

So got an [Asus ChromeBook Flip](https://www.asus.com/us/Notebooks/ASUS_Chromebook_Flip_C100PA/) and I installed [crouton](https://github.com/dnschneid/crouton) on it (translation: I now have a tiny laptop that's also a tablet with Linux on it and it also has a super optimized version of Google Chrome on it). I ran into trouble though when I wanted to start using Dropbox. There were three issues:

1. There doesn't seem to be a Linux Dropbox client for [ARM](https://en.wikipedia.org/wiki/ARM_architecture) (and the Flip is an ARM machine).
2. After installing crouton and a few necessities I only have about 7 gigibytes left.  My dropbox is currently at about half that but I don't exactly want to use it all up right away.
3. I intend to use this machine on the go because it seems to tether nicely with my phone via USB and I don't exactly want a bunch of extra background network traffic using up my data plan.

Also, I'd been looking for a fun DIY project to work on now that I once again had a tiny, highly portable, Linux machine.

so what does this thing do??
====

It uses the [Dropbox API](https://www.dropbox.com/developers/documentation/http/documentation) and the [NodeJS HTTPS library](https://nodejs.org/api/https.html) to implent 3 commands:

- List files in a directory

```
$ box list path/to/directory/in/drobox
(dir)      some_subdirectory
124 B      some_small_file
(dir)      another_subdirectory
137.49 MB  larger_file
```

or if you don't specify a path it lists the top level files and directories

```
$ box list
(dir)      some_subdirectory
124 B      some_file
```

- Download a file

```
$ box download path/to/file/in/dropbox
```

you can also specify a destination path

```
$ box download path/to/file/in/dropbox path/to/destination/on/this/machine
```

- Upload a file

```
$ box upload path/to/file/on/this/machine path/to/destination/on/dropbox
```

if the file already exists and hasn't changed since you last downloaded it via box it should overwrite
if it has changed or something else goes wrong it should save in a new file with a name like your_file(conflicted)

installation and setup
====

npm installation coming...

1. clone this repository `git clone https://github.com/olleicua/box.git`
2. make the binary executable `chmod +x /path/to/repository/bin/box`
3. copy or symlink `/path/to/repository/bin/box` to somewhere in your path (if you aren't sure what that means [this article](https://wiki.archlinux.org/index.php/environment_variables) might help (focus on the parts about the `$PATH` variable))
4. find your dropbox API access token by logging into your dropbox account and then going here: https://dropbox.github.io/dropbox-api-v2-explorer/#files_get_metadata and then clicking the "Get Token" button.
5. `box init YOUR_ACCESS_TOKEN`
