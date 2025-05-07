import axios from "axios";
import Cookies from "js-cookie";
import { errorHandler } from "@/helpers";
import { SimpleRanking, TeamRanking } from "@/interfaces";

const tokenError = {
  response: {
    data: {
      success: false,
      code: "AUTH_TOKEN_MISSING",
      type: "error",
      showAlert: true,
      title: "Token no encontrado",
      techMessage: "The authentication token is missing from cookies.",
      friendlyMessage: "No se encontró el token de sesión. Por favor, inicia sesión nuevamente.",
    },
  },
};

export const getIndividualRanking = async (programName: string, limit: number = 10): Promise<SimpleRanking[]> => {
  try {
    const token = Cookies.get("token");
    if (!token) throw tokenError;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_RANKING_URL}/individual/${programName}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success || !Array.isArray(response.data.data)) throw new Error("Unexpected response structure");
    return response.data.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getTeamRanking = async (programName: string): Promise<Array<TeamRanking>> => {
  try {
    const token = Cookies.get("token");
    if (!token) throw tokenError;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_RANKING_URL}/team/${programName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success || !Array.isArray(response.data.data)) throw new Error("Unexpected response structure");
    return response.data.data;
  } catch (error) {
    throw errorHandler(error);
  }
};