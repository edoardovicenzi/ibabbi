defmodule IbabbiWeb.PageController do
  use IbabbiWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
