import logo from "../../assets/images/logo.png";

export default function AuthBanner() {
  return (
    <div className="relative flex w-full lg:w-1/2 items-center justify-center px-6 sm:px-10 lg:p-12 min-h-[40vh] lg:min-h-screen overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] via-[#0A2A3A] to-[#0E3A4A]" />

      <div className="absolute w-[350px] h-[350px] bg-[#76aaaa]/30 blur-3xl rounded-full top-10 left-10" />

      <div className="absolute w-[300px] h-[300px] bg-[#91c4c6]/20 blur-3xl rounded-full bottom-10 right-10" />

      <div className="relative text-center max-w-lg flex flex-col items-center text-white">
        <img
          src={logo}
          className="h-20 sm:h-24 md:h-28 lg:h-32 mb-8 drop-shadow-xl"
        />

        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold leading-snug mb-4 font-[Montserrat]">
          Plateforme intelligente d’aide au contrôle de qualité du registre des
          contribuables
        </h1>

        <p className="text-xs sm:text-sm text-white/70 font-[Montserrat]">
          Direction Générale des Impôts - République de Madagascar
        </p>
      </div>

      <div className="absolute bottom-4 lg:bottom-6 text-[10px] sm:text-xs text-white/50 text-center w-full px-4 font-[Montserrat]">
        © 2026 DGI - Tous droits réservés
      </div>
    </div>
  );
}