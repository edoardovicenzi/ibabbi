# Ibabbi

## Development with mise

This project uses [mise](https://mise.jdx.dev/) for managing Elixir and Erlang versions.

1. Install mise if you don't have it: [mise installation guide](https://mise.jdx.dev/getting-started.html)
2. Trust and install tool versions:
   ```bash
   mise trust
   mise install
   ```
   This will install Elixir `1.20.4-otp-29` and Erlang `29.1.2` as specified in `mise.toml`. The postinstall also installs `phx_new`.
3. Run the dev task:
   ```bash
   mise run dev
   ```
   Or manually: `mix setup && mix phx.server` / `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Development with mix
To start your Phoenix server:

* Run `mix setup` to install and setup dependencies
* Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://phoenix.hexdocs.pm/deployment.html).

## Learn more

* Official website: https://www.phoenixframework.org/
* Guides: https://phoenix.hexdocs.pm/overview.html
* Docs: https://phoenix.hexdocs.pm
* Forum: https://elixirforum.com/c/phoenix-forum
* Source: https://github.com/phoenixframework/phoenix
