import axios from "axios";
import type { Session, User, Character, Lore } from "$lib/types/contribution-types";

export const contributionService = {
  //baseUrl: "http://localhost:4000",
   baseUrl: "https://the-world-of-api.onrender.com",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async contribute(lore: Lore, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/characters/" + lore.charactersinv + "/lores", lore);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async contributeWithImages(formData: FormData, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/characters/" + JSON.parse(formData.get("lore") as string).charactersinv + "/lores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getCharacters(session: Session): Promise<Character[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/characters");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getLores(session: Session): Promise<Lore[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/lores");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getLoresById(id: string, session: Session): Promise<Lore | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer" + session.token;
      const response = await axios.get(`${this.baseUrl}/api/lores/${id}`);
      if (response.status == 200) {
        return response.data as Lore;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteImage(loreId: string, imageUrl: string, session: Session): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(`${this.baseUrl}/api/lores/deleteImage`, { loreId, imageUrl });
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getAllLores(): Promise<Lore[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/lores`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
