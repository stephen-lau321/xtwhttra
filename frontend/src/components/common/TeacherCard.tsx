import { useNavigate } from "react-router-dom";
import type { StreetClaim } from "../../types";

interface Props {
  claim: StreetClaim;
}

export default function TeacherCard({ claim }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="card p-4 flex items-start gap-4 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/teacher/${claim.teacher?.user.id}`)}
    >
      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-lg">
        {claim.teacher?.user.avatar ? (
          <img
            src={claim.teacher.user.avatar}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          "??"
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {claim.teacher?.user.nickname || "“Ù¿÷÷˜¿Ì»À"}
        </h3>
        <p className="text-sm text-primary-600 mt-0.5">
          {claim.instrument.name} °§ {claim.streetName}
        </p>
        {claim.district && (
          <p className="text-xs text-gray-400 mt-1">{claim.district}</p>
        )}
      </div>

      <svg className="w-4 h-4 text-gray-300 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
