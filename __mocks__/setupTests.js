const storageMock = () => {
	return {
		getItem: jest.fn(),
		setItem: jest.fn(),
		removeItem: jest.fn(),
		clear: jest.fn(),
	}
}

global.localStorage = storageMock()
global.sessionStorage = storageMock()
