/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from "papaparse";
import { useState } from "react";

interface Entry {
  id: number;
  discipline: string;
  firstname?: string;
  lastname?: string;
  sex?: string;
  country?: string;
  birthdate?: string;
  seasonbest?: string;
  seasonbestDate?: string;
  seasonbestLocation?: string;
  personalbest?: string;
  personalbestDate?: string;
  personalbestLocation?: string;
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
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
  return (
    <div className="bg-tourDarkBlue h-screen flex flex-col py-10 gap-4">
      <h1 className="text-tourLightOrange text-4xl font-bold text-center">
        WorldAthletics Exporter
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
                onClick={() => {}}
              >
                Download
              </button>
            </>
          )}
        </div>
        <table className="table-auto border border-white text-white">
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
                  {entry.birthdate}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.seasonbest}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.seasonbestDate}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.seasonbestLocation}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.personalbest}
                </td>
                <td className="border  border-white px-4 py-2">
                  {entry.personalbestDate}
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
