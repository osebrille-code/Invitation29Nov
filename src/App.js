import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  Gift,
  Sparkles,
  User, // Ajout de l'icône User pour le champ Personnes
} from "lucide-react";

// Le composant principal de l'application
const InvitationForm = () => {
  // URL du Webhook Make
  const MAKE_WEBHOOK_URL =
    "https://hook.eu1.make.com/ob32kulb3lawobf3djrqffqx8h4ee1pp";

  const [formData, setFormData] = useState({
    nom: "",
    // SUPPRIMÉ : telephone n'est plus dans l'état
    creneau: "",
    // NOUVEAU: Champ pour le nombre de personnes, initialisé à 1 (non nul)
    nombrePersonnes: 1, 
  });

  const [status, setStatus] = useState("idle");

  const slots = [
    "10h00 - 12h00",
    "14h00 - 16h00",
    "16h00 - 18h00",
  ];

  // Gestion des changements de formulaire, y compris la conversion du nombre
  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (name === 'nombrePersonnes' && type === 'number') {
        // Assurez-vous que le nombre est un entier et est au moins 1
        const parsedValue = parseInt(value, 10);
        newValue = isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
    }

    setFormData({ 
      ...formData, 
      [name]: newValue
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Le téléphone est retiré du body JSON
        body: JSON.stringify({
          ...formData,
          dateSoumission: new Date().toLocaleDateString("fr-FR"),
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border-t-4 border-pink-500">
          <div className="animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            C'est noté !
          </h2>
          <p className="text-gray-600">
            Merci {formData.nom}.<br />
            Votre créneau pour {formData.nombrePersonnes} personne{formData.nombrePersonnes > 1 ? 's' : ''} est réservé.
          </p>
          <div className="mt-4 bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 border border-yellow-100">
            🥞 On garde les crêpes au chaud pour vous !
          </div>
          <p className="text-xs text-gray-400 mt-4">
            On se voit samedi, So.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white font-sans text-gray-800">
      <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl sm:min-h-0 sm:my-8 sm:rounded-3xl overflow-hidden">
        {/* Header Image */}
        <div className="bg-black text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
          <h1 className="text-3xl font-bold uppercase tracking-widest relative z-10 mb-2">
            Invitation VIP
          </h1>
          <p className="text-pink-400 font-medium relative z-10 tracking-wide">
            Younique
          </p>
        </div>

        <div className="p-8">
          {/* Intro Text & Teasing */}
          <div className="mb-8 text-center space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              Viens passer un moment à la maison{" "}
              <span className="font-bold text-pink-600">
                Shopping sans chichi avec So.
              </span>
              .
            </p>

            <p className="text-sm text-gray-500">
              Venez découvrir les coffrets Exclusifs Black Friday.
            </p>

            {/* BLOC MIS EN AVANT : CRÊPES & SURPRISES */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100 shadow-sm transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 font-bold text-gray-800 mb-1">
                <Sparkles className="text-yellow-500" size={20} /> Au programme
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li className="flex items-center justify-center gap-2">
                  🎁{" "}
                  <span className="font-medium">Surprises et tirage au sort</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  🥞{" "}
                  <span className="font-medium">Crêpes party & Boissons</span>
                </li>
              </ul>
            </div>

            {/* Date et Lieu */}
            <div className="flex justify-center gap-4 pt-2 text-xs font-semibold text-gray-500 tracking-wide">
              <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                <Calendar size={14} className="text-pink-500" /> Samedi 29 Nov.
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                <MapPin size={14} className="text-pink-500" /> Ambert
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                  Nom & Prénom
                </label>
                <input
                  required
                  type="text"
                  name="nom" // Ajout de l'attribut name
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleFormChange}
                />
              </div>
              
              {/* NOUVEAU CHAMP: Nombre de Personnes */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                  Nombre de personnes (inclus vous)
                </label>
                <div className="relative flex items-center">
                    <User size={18} className="absolute left-3 text-gray-400 pointer-events-none" />
                    <input
                      required
                      type="number" // Type correct pour un nombre
                      min="1" // Minimum non nul
                      name="nombrePersonnes" // Nom de l'état correspondant
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition appearance-none"
                      placeholder="Toi + accompagnateur"
                      value={formData.nombrePersonnes}
                      onChange={handleFormChange}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                    *Ce champ est obligatoire et doit être au moins 1.
                </p>
              </div>

              {/* CHAMP TÉLÉPHONE RETIRÉ */}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Votre créneau gourmand
              </label>
              <div className="grid gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, creneau: slot })}
                    className={`p-3 rounded-lg border text-left transition flex items-center gap-3 text-sm ${
                      formData.creneau === slot
                        ? "border-pink-500 bg-pink-50 text-pink-700 font-bold ring-1 ring-pink-500 shadow-sm"
                        : "border-gray-100 bg-white hover:border-pink-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-full shrink-0 ${
                        formData.creneau === slot
                          ? "bg-pink-200 text-pink-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Clock size={16} />
                    </div>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              // La validation ne requiert plus "formData.telephone"
              disabled={!formData.creneau || status === "loading" || !formData.nom}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 shadow-lg hover:shadow-xl transition transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {status === "loading" ? (
                "Validation..."
              ) : (
                <>
                  Je réserve ma place <Gift size={18} />
                </>
              )}
            </button>
            {status === 'error' && (
                <p className="text-red-500 text-sm text-center">
                    Une erreur est survenue lors de la soumission. Veuillez réessayer.
                </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvitationForm;
