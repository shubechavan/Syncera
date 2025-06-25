import CARD_2 from "../../assets/CARD_2.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* LEFT PANEL */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-lg font-semibold text-black">Syncera</h2>
          <a
            href="https://dreamscape-realty.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
          >
            <span className="font-medium text-gray-600">Backed by</span>
            <span className="font-semibold text-black">Dreamscape Realty</span>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
              alt="Dreamscape Realty Logo"
             className="h-8 w-auto ml-2 object-contain drop-shadow-sm"
            />
          </a>
        </div>

        {children}
      </div>


      {/* RIGHT PANEL */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

        <div className="absolute top-10 left-10 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        <img
          src={CARD_2 || "/placeholder.svg"}
          alt="Card Design"
          className="w-64 lg:w-[90%] absolute bottom-10 right-6 shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold">${value}</span>
      </div>
    </div>
  );
};
