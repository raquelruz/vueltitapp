export const ProfileAvatar = ({ profile }) => {
    if (profile.avatar) {
        return (
            <img
                src={profile.avatar}
                alt=""
                className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-100"
            />
        );
    }

    return (
        <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-4xl text-indigo-600 font-bold ring-4 ring-indigo-50">
            {profile.username?.[0]?.toUpperCase()}
        </div>
    );
};