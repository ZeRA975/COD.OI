import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [user, setUser] = useState({ username: "", platform: "", region: "" });
  const [tournaments, setTournaments] = useState([
    { id: 1, name: "1v1 Hardpoint Clash", date: "2025-04-10", format: "1v1", region: "Réunion" },
    { id: 2, name: "2v2 SnD Cup", date: "2025-04-15", format: "2v2", region: "Maurice" }
  ]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [score, setScore] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">COD OI - Compétitions COD</h1>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="dashboard">Accueil</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="tournaments">Tournois</TabsTrigger>
          <TabsTrigger value="submit">Résultats</TabsTrigger>
          <TabsTrigger value="leaderboard">Classement</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Bienvenue sur COD OI</h2>
              <p className="mb-2">Prochains tournois à venir :</p>
              <ul className="list-disc pl-4">
                {tournaments.map((t) => (
                  <li key={t.id}>{t.name} - {t.date} ({t.region})</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <form className="space-y-4">
            <Input name="username" placeholder="Pseudo" onChange={handleProfileChange} />
            <Input name="platform" placeholder="Plateforme (PS, Xbox, PC)" onChange={handleProfileChange} />
            <Input name="region" placeholder="Région (Réunion, Maurice...)" onChange={handleProfileChange} />
            <Button onClick={() => alert("Profil enregistré")}>Enregistrer</Button>
          </form>
        </TabsContent>

        <TabsContent value="tournaments">
          <ul className="space-y-2">
            {tournaments.map((t) => (
              <li key={t.id} className="border p-2 rounded">
                <strong>{t.name}</strong> - {t.date} - {t.format} - {t.region}
                <Button className="ml-4" onClick={() => setSelectedTournament(t.id)}>S’inscrire</Button>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="submit">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score (ex: 2-1)" required />
              <Input type="file" accept="image/*" onChange={handleFileChange} required />
              <Button type="submit">Soumettre</Button>
            </form>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p className="text-green-600 font-semibold">Score soumis avec succès !</p>
                <p className="mt-2">Score : {score}</p>
                <p>Preuve : {screenshot?.name}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="leaderboard">
          <ul className="space-y-2">
            <li className="border p-2 rounded">1. Ghost - 18 pts (Réunion)</li>
            <li className="border p-2 rounded">2. Zero - 15 pts (Maurice)</li>
            <li className="border p-2 rounded">3. Blaze - 12 pts (Mayotte)</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
