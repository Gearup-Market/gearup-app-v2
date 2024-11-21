import { VerifiedView } from "@/views";

const Verified = ({ params }: { params: { token: string } }) => {

	return <VerifiedView token={params.token}/>;
};

export default Verified;
