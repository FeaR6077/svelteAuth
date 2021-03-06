import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../stores/auth";
import config from "../../auth_config";

const createClient = async () => {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });

  return auth0Client;
};

const loginWithPopup = async (client, options) => {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
};

const logout = (client) => {
  return client.logout();
};

const auth: any = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth;
