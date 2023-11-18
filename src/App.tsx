/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from "papaparse";
import { useState, useRef } from "react";
import { getAthlete } from "./api/worldathletics";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import ExcelIcon from "./ExcelIcon";

interface Entry {
  id: number;
  discipline: string;
  firstname?: string;
  lastname?: string;
  sex?: "MALE" | "FEMALE" | null;
  country?: string;
  birthdate?: string | null;
  seasonbest?: string;
  seasonbestDate?: string;
  seasonbestLocation?: string;
  personalbest?: string;
  personalbestDate?: string;
  personalbestLocation?: string;
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const ref = useRef<HTMLTableElement>(null);
  const changeHandler = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const entries: Entry[] = [];
        results.data.forEach((entry: any) => {
          if (entry.Id && entry.Discipline) {
            entries.push({
              id: parseInt(entry.Id),
              discipline: entry.Discipline,
            });
          }
        }),
          setEntries(entries);
      },
    });
    event.target.value = "";
  };

  const downloadHandler = async () => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const athlete = await getAthlete(entry.id);
      if (!athlete) {
        return;
      }
      const personalbests = athlete.personalbests.filter(
        (pb) => pb.disciplineCode == entry.discipline
      );
      const seasonbests = athlete.seasonsbests.filter(
        (sb) => sb.disciplineCode == entry.discipline
      );
      const personalbest =
        personalbests.length > 0
          ? personalbests.find((pf) => !pf.indoor) || personalbests[0]
          : null;
      const seasonbest =
        seasonbests.length > 0
          ? seasonbests.find((pf) => !pf.indoor) || seasonbests[0]
          : null;
      entry.firstname = athlete.firstname;
      entry.lastname = athlete.lastname;
      entry.sex = athlete.sex;
      entry.country = athlete.country;
      entry.birthdate = athlete.birthdate;
      if (personalbest) {
        entry.personalbest = personalbest.mark;
        entry.personalbestDate = personalbest.date;
        entry.personalbestLocation = personalbest.venue;
      }
      if (seasonbest) {
        entry.seasonbest = seasonbest.mark;
        entry.seasonbestDate = seasonbest.date;
        entry.seasonbestLocation = seasonbest.venue;
      }
      setEntries([...entries]);
    }
  };

  return (
    <div className="bg-tourDarkBlue h-screen flex flex-col py-10 gap-4">
      <h1 className="text-tourLightOrange text-4xl font-bold text-center">
        WorldAthletics Export
      </h1>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-row gap-2">
          {entries.length == 0 && (
            <input
              type="file"
              className="text-tourLightOrange"
              accept=".csv"
              onChange={changeHandler}
            />
          )}

          {entries.length > 0 && (
            <>
              <button
                className="bg-tourLightOrange text-tourDarkBlue px-4 py-2 rounded-md"
                onClick={() => {
                  setEntries([]);
                }}
              >
                Reset
              </button>
              <button
                className="bg-tourLightOrange text-tourDarkBlue px-4 py-2 rounded-md"
                onClick={downloadHandler}
              >
                Load
              </button>
              <button
                className="bg-tourLightOrange text-tourDarkBlue px-4 py-2 rounded-md"
                onClick={() => {
                  const wb = utils.table_to_book(ref.current);
                  const wbout = write(wb, { bookType: "xlsx", type: "binary" });
                  function s2ab(s: any) {
                    const buf = new ArrayBuffer(s.length);
                    const view = new Uint8Array(buf);
                    for (let i = 0; i < s.length; i++)
                      view[i] = s.charCodeAt(i) & 0xff;
                    return buf;
                  }
                  saveAs(
                    new Blob([s2ab(wbout)], {
                      type: "application/octet-stream",
                    }),
                    "worldathletics.xlsx"
                  );
                }}
              >
                <ExcelIcon />
              </button>
            </>
          )}
        </div>
        <table className="table-auto border border-white text-white" ref={ref}>
          <thead>
            <tr>
              <th className="border  border-white px-4 py-2">Id</th>
              <th className="border  border-white px-4 py-2">Discipline</th>
              <th className="border  border-white px-4 py-2">Firstname</th>
              <th className="border  border-white px-4 py-2">Lastname</th>
              <th className="border  border-white px-4 py-2">Sex</th>
              <th className="border  border-white px-4 py-2">Country</th>
              <th className="border  border-white px-4 py-2">Birthdate</th>
              <th className="border  border-white px-4 py-2">Seasonbest</th>
              <th className="border  border-white px-4 py-2">
                Seasonbest Date
              </th>
              <th className="border  border-white px-4 py-2">
                Seasonbest Location
              </th>
              <th className="border  border-white px-4 py-2">Personalbest </th>
              <th className="border  border-white px-4 py-2">
                Personalbest Date
              </th>
              <th className="border  border-white px-4 py-2">
                Personalbest Location
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td className="border  border-white px-4 py-2">{entry.id}</td>
                <td className="border  border-white px-4 py-2">
                  {entry.discipline}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.firstname}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.lastname}
                </td>
                <td className="border  border-white px-4 py-2">{entry.sex}</td>
                <td className="border  border-white px-4 py-2">
                  {entry.country}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.birthdate &&
                    new Date(entry.birthdate).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.seasonbest}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.seasonbestDate &&
                    new Date(entry.seasonbestDate).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.seasonbestLocation}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.personalbest}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.personalbestDate &&
                    new Date(entry.personalbestDate).toLocaleDateString(
                      "de-DE",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.personalbestLocation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
