import { SimpleRanking, TeamRanking } from "@/interfaces";
import api from "@/lib/api";

export const getIndividualRanking = async (limit: number = 10): Promise<SimpleRanking[]> => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_RANKING_URL}/individual?limit=${limit}`);

    if (!response?.data?.success || !Array.isArray(response.data.data)) throw new Error("Unexpected response structure");
    return response.data.data;
  } catch (error:unknown) {
    throw error;
  }
};

export const getTeamRanking = async (programName: string): Promise<Array<TeamRanking>> => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_RANKING_URL}/team/${programName}`);

    if (!response?.data?.success || !Array.isArray(response.data.data)) throw new Error("Unexpected response structure");
    return response.data.data;
  } catch (error:unknown) {
    throw error;
  }
};

export const getProgramIndividualRanking = async (programName: string, limit: number = 100): Promise<SimpleRanking[]> => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_RANKING_URL}/individual/${programName}?limit=${limit}`);

    if (!response?.data?.success || !Array.isArray(response.data.data)) throw new Error("Unexpected response structure");
    return response.data.data;
  } catch (error:unknown) {
    throw error;
  }
};
