import logo from "../../assets/images/logo.png";

export default function AuthBanner() {
  return (
    <div className="relative flex w-full lg:w-1/2 items-center justify-center px-4 sm:px-6 lg:px-12 py-10 lg:py-0 min-h-[40vh] lg:min-h-screen overflow-hidden">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] via-[#0A2A3A] to-[#0E3A4A]" />

      {/* Effets visuels (adaptatifs) */}
      <div className="absolute w-2/3 sm:w-1/2 max-w-xs sm:max-w-sm h-2/3 sm:h-1/2 bg-[#76aaaa]/30 blur-3xl rounded-full top-6 left-6" />
      <div className="absolute w-2/3 sm:w-1/2 max-w-xs sm:max-w-sm h-2/3 sm:h-1/2 bg-[#91c4c6]/20 blur-3xl rounded-full bottom-6 right-6" />

      {/* Contenu */}
      <div className="relative text-center max-w-md sm:max-w-lg flex flex-col items-center text-white px-4">
        <img
          src={logo}
          className="h-16 sm:h-20 md:h-24 lg:h-32 mb-6 sm:mb-8 drop-shadow-xl"
        />

        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-snug mb-3 sm:mb-4 font-[Montserrat]">
          Plateforme intelligente d’aide au contrôle de qualité du registre des
          contribuables
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-white/70 font-[Montserrat]">
          Direction Générale des Impôts - République de Madagascar
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 text-[10px] sm:text-xs md:text-sm text-white/50 text-center w-full px-4 font-[Montserrat]">
        © 2026 DGI - Tous droits réservés
      </div>
    </div>
  );
}
