defmodule Ibabbi.Application do
  # See https://elixir.hexdocs.pm/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      IbabbiWeb.Telemetry,
      Ibabbi.Repo,
      {Ecto.Migrator,
       repos: Application.fetch_env!(:ibabbi, :ecto_repos), skip: skip_migrations?()},
      {DNSCluster, query: Application.get_env(:ibabbi, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Ibabbi.PubSub},
      # Start a worker by calling: Ibabbi.Worker.start_link(arg)
      # {Ibabbi.Worker, arg},
      # Start to serve requests, typically the last entry
      IbabbiWeb.Endpoint
    ]

    # See https://elixir.hexdocs.pm/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Ibabbi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    IbabbiWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  defp skip_migrations?() do
    # By default, sqlite migrations are run when using a release
    System.get_env("RELEASE_NAME") == nil
  end
end
