import { toast } from 'react-toastify';

export const errorMessage = (message: string) => {
	toast.info(`${message}`, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
