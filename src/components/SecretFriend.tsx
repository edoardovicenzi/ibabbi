import { useEffect, useState } from "react";
import { getNames } from "../utilities/db";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import {
  getLocalStorageValue,
  localStorageKeyExists,
  setLocalStorage,
} from "../utilities/localStorage";
import type { BabbiLocalStorage, PersonSecretFriend } from "../types";

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<PersonSecretFriend> {
  if (!params.id) throw new Error("List ID not provided");

  const queryParams = new URL(location.href).searchParams;

  if (!queryParams.get("id")) throw new Error("User ID not provided");

  const data = await getNames(params.id);

  if (!data) throw new Error("List Not Found");

  return data.filter((item) => item.id === queryParams.get("id"))[0];
}
export default function SecretFriend({ festivity = "christmas" }) {
  const [secretFriend, setSecretFriend] = useState("");
  const { id } = useParams();
  const loaderData: PersonSecretFriend = useLoaderData();
  const label =
    festivity === "christmas" ? "babbo segreto" : "coniglio segreto";

  useEffect(() => {
    //se esiste un local storage prendi e parsa l'oggetto al suo interno
    try {
      const userId = new URL(location.href).searchParams.get("id");
      if (!id) throw new Error("List ID not provided");
      if (!userId) throw new Error("User ID not provided");

      if (localStorageKeyExists("ibabbi")) {
        const storage: BabbiLocalStorage = JSON.parse(
          getLocalStorageValue("ibabbi"),
        );
        if (storage[id][userId]) {
          setSecretFriend(storage[id][userId].secretFriendName);
        } else {
          const newStorage: BabbiLocalStorage = {
            ...storage,
            [`${id}`]: {
              ...storage[id],
              [`${userId}`]: {
                secretFriendName: loaderData.secretFriend.name,
              },
            },
          };
          setLocalStorage("ibabbi", newStorage);
          setSecretFriend(newStorage[id][userId].secretFriendName);
        }
      } else {
        const newStorage: BabbiLocalStorage = {
          [`${id}`]: {
            [`${userId}`]: {
              secretFriendName: loaderData.secretFriend.name,
            },
          },
        };
        setLocalStorage("ibabbi", newStorage);
        setSecretFriend(newStorage[id][userId].secretFriendName);
      }
    } catch {}
  }, [id]);

  return (
    <div className="secret-santa-wrapper">
      <div className="secret-santa-card">
        <div className="secret-santa-icon">🎁</div>

        <h3 className="secret-santa-title">Il tuo {label} è...</h3>

        {secretFriend ? (
          <h1 className="secret-santa-name">{secretFriend}</h1>
        ) : (
          <p className="secret-santa-loading">
            Gli elfi stanno controllando la lista... ✨
          </p>
        )}
      </div>
    </div>
  );
}
