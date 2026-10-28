defmodule Ibabbi.Repo do
  use Ecto.Repo,
    otp_app: :ibabbi,
    adapter: Ecto.Adapters.SQLite3
end
