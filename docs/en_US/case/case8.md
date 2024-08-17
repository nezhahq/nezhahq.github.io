# nezha-agent-rs: A Lightweight, High-Performance Agent for Low-End Devices

**[GitHub Repository](https://github.com/GenshinMinecraft/nezha-agent-rs)**

A **lightweight, high-performance, low-resource-consuming** agent for Nezha panel written in Rust.

Currently, only the main dashboard monitoring features such as Tasks and Terminal are implemented (or may not be implemented to keep the size minimal).

## Usage

The usage is identical to the official Nezha Agent. Use the `--help` option to view help information:

```
Nezha Agent

Usage: nezha-agent-rs [OPTIONS] --server <SERVER> --password <PASSWORD>

Options:
  -s, --server <SERVER>      Frontend Server Address
  -p, --password <PASSWORD>  Token Setting
      --debug                Enable Debug Log
  -h, --help                 Print help
  -V, --version              Print version
```

Basic usage requires `./nezha-agent-rs -s [server address:port] -p [connection key]`

Please visit the project's [Actions](https://github.com/GenshinMinecraft/nezha-agent-rs/actions) to download the release build files. They will not be stored on the Releases page, so please download them manually.

If your system is based on Glibc, you can choose the build file with the `gnu` label.

If your system is not based on Glibc (such as Alpine, OpenWRT, etc.), make sure to select the build file with the `musl` label.

Any system can run the build file labeled with `musl`. The only difference is that Glibc has a slightly smaller footprint.

This project will not be maintained long-term and is used solely for the author's learning purposes in Rust. Unless you have specific requirements, please use the **[official Nezha Agent](https://github.com/nezhahq/agent)**.

## Acknowledgments

- **[Nezha](https://github.com/naiba/nezha)**: Thank you Naiba for developing such a useful panel.
- **[JetBrains](https://www.jetbrains.com/)**: Thank you JetBrains for providing the RustRover IDE.

## License

This project is released under the WTFPL (Do What The Fuck You Want To Public License).

```license
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004
 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
  0. You just DO WHAT THE FUCK YOU WANT TO.
```

## Contributions

If you would like to contribute to this project, please open a PR at the **[GitHub Repository](https://github.com/GenshinMinecraft/nezha-agent-rs)**.