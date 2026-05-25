import keycloak from "../../services/keycloak";

export default function PendingApproval() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-10 rounded-xl shadow border border-gray-100 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold mb-2">Account Pending Verification</h2>
        <p className="text-gray-600 mb-6">
          Your profile has been successfully created and is currently being reviewed by our admin team. 
          You will receive an email and a Slack notification as soon as you are approved!
        </p>
        <button
          onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          Logout for now
        </button>
      </div>
    </div>
  );
}