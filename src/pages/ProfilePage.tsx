import { useState } from "react";
import { Camera } from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import DashboardCard from "../components/ui/DashboardCard";

export default function ProfilePage() {
  const [form, setForm] = useState({ firstName: "", lastName: "DGI", email: "admin@dgi.mg", phone: "+261 34 00 000 00", currentPassword: "", newPassword: "", confirmPassword: "",});
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Mon profil</h1>
        <p className="text-[var(--text-secondary)]">Gestion des informations personnelles et sécurité du compte</p>
      </div>
      <DashboardCard title={""}>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--bg-primary)] flex items-center justify-center">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover"/>
              ) : (
                <span className="text-2xl font-bold text-[var(--primary)]">A</span>
              )}
            </div>

            <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition">
              <Camera size={16} className="text-white" />
              <input type="file" accept="image/*" onChange={handleImage} className="hidden"/>
            </label>

          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Photo de profil</h2>
            <p className="text-sm text-[var(--text-secondary)]">Cliquez sur l’icône pour changer votre image</p>
          </div>
        </div>
      </DashboardCard>
      <DashboardCard title={""}>
        <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Informations personnelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input  name="firstName" onChange={handleChange} placeholder="Votre prénom officiel"/>
          <Input name="lastName" onChange={handleChange} placeholder="Votre nom de famille"/>
          <Input name="email" type="email" onChange={handleChange} placeholder="Email utilisé pour la connexion"/>
          <Input name="phone" onChange={handleChange} placeholder="Numéro de contact"/>
        </div>
      </DashboardCard>

      <DashboardCard title={""}>
        <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Sécurité du compte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input placeholder="Mot de passe actuel" type="password" name="currentPassword"  onChange={handleChange}/>
          <Input placeholder="Nouveau mot de passe" type="password" name="newPassword" onChange={handleChange}/>
          <Input placeholder="Confirmation" type="password" name="confirmPassword"onChange={handleChange}/>
        </div>
      </DashboardCard>
      <div className="flex justify-end gap-3">
        <Button variant="secondary">Annuler</Button>
        <Button>Enregistrer</Button>
      </div>
    </div>
  );
}