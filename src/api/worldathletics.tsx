import { Athlete } from "../worldathletics.types";

const WORLDATHLETICS_URL = import.meta.env.VITE_WORLDATHLETICS_URL;

export async function getAthlete(athleteId: number): Promise<Athlete | null> {
  try {
    return await fetch(`${WORLDATHLETICS_URL}/athletes/${athleteId}`).then(
      (response) => {
        return response.json();
      }
    );
  } catch (error) {
    console.log(error);
  }
  return null;
}
