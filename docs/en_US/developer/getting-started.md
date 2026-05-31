---
outline: deep
---

# Getting Started

This guide walks you through setting up a development environment so you can quickly start contributing to Nezha.

First, fork the Nezha repository so you have a place to save your changes. You can then choose container-based development or local development. To help you get started faster, this guide introduces container-based development first.

## Container Development Environment

To use container-based development in VS Code, install the `ms-vscode-remote.remote-containers` extension.

### GitHub Codespaces

In your forked repository, click `Code` -> `Codespaces` -> `Create codespace on master` in the upper-right corner to create a cloud development environment, then wait for the environment to finish building.

You can also install the `GitHub.codespaces` extension in VS Code or another supported IDE and connect directly from there.

### Remote Container Development

If you have a dedicated development server with Docker or a compatible runtime installed, you can create and build a remote development container over SSH and develop on that remote server. The following example uses VS Code:

1. Configure your `~/.ssh/config` file on *nix or `%HOMEPATH%/.ssh/config` on Windows. Here is a simple example:

   ```ssh-config
   Host Dev
     HostName dev.server.host
     User <your-username>
     IdentityFile <path-to-your-private-key>
   ```

2. Log in to the remote server with SSH. If the first step is configured correctly, you can test it with `ssh Dev`.
3. Clone your forked repository on the server: `git clone <your-forked-repository-url>`.
4. Open the VS Code Remote Explorer from the left sidebar. You need to install the official `remote` extension series.
5. Open the cloned directory in VS Code.
6. Press `F1`, then type and select `Dev Containers: Rebuild and Reopen in Container`.
7. Wait for the development environment to finish building.

### Local Container Development

If Docker or a compatible runtime is installed on your local machine, you can create and build the development container locally. You may encounter network issues depending on your environment; resolve them according to your local network setup. The following example uses VS Code:

1. Clone the repository:

   ```shell
   git clone <your-forked-repository-url>
   ```

2. Open the cloned directory in VS Code.
3. Press `F1`, then type and select `Dev Containers: Rebuild and Reopen in Container`.
4. Wait for the development environment to finish building.

## Start Developing

After the environment finishes its automatic setup, Nezha is ready to build by default. You can start editing freely and run `.devcontainer/build.sh` to compile and test your changes.

### Read the Documentation

You can read the [API documentation](./api.md) to learn which Web APIs Nezha provides.

If you use one of the container development environments above, these files have already been generated and are stored under `cmd/dashboard/docs` in the development environment.
