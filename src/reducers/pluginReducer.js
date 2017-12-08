const defaults = {
	downloading: false,
	plugins: [
		{
			label: 'ACFPRO',
			id: 'acf',
			url: 'https://firebasestorage.googleapis.com/v0/b/wp-project-launcher.appspot.com/o/acfpro.zip?alt=media&token=e401f7a3-e4f1-422e-b0cd-bcd058c44961',
			checked: false,
			downloading: false,
			downloaded: false,
			failed: false,
		},
		{
			label: 'Woocommerce',
			id: 'woocommerce',
			url: 'https://firebasestorage.googleapis.com/v0/b/wp-project-launcher.appspot.com/o/woocommerce.zip?alt=media&token=71722724-ba6e-42ec-98f0-3503165d2bbc',
			checked: false,
			downloading: false,
			downloaded: false,
			failed: false,
		},
		{
			label: 'Contact form 7',
			id: 'contactform7',
			url: 'https://firebasestorage.googleapis.com/v0/b/wp-project-launcher.appspot.com/o/contact-form-7.zip?alt=media&token=fdc94334-e841-42b3-8916-6b246308aea9',
			checked: false,
			downloading: false,
			downloaded: false,
			failed: false,
		},
		{
			label: 'Yoast',
			id: 'yoast',
			url: 'https://firebasestorage.googleapis.com/v0/b/wp-project-launcher.appspot.com/o/yoast.zip?alt=media&token=b22ae0c5-e37e-4c4f-ae58-494502e4ab0c',
			checked: false,
			downloading: false,
			downloaded: false,
			failed: false,
		}
	]
}

const pluginReducer = (state = defaults, action) => {

	switch (action.type) {

		case 'SET_PLUGIN':
			state = {
				...state,
				plugins: action.payload
			}
			break;

		case 'SET_DOWNLOADING':
			state = {
				...state,
				downloading: action.payload
			}
			break;

		default: break;

	}

	return state;
}

export default pluginReducer;