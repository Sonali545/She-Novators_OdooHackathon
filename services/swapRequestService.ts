
import { SwapRequest, SwapStatus, User } from '../types';
import { MOCK_SWAP_REQUESTS } from '../constants';

const REQUESTS_KEY = 'skillforge_swap_requests';

export const initSwapRequests = (): void => {
  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(MOCK_SWAP_REQUESTS));
  }
};

export const getSwapRequests = (): SwapRequest[] => {
  const requestsJson = localStorage.getItem(REQUESTS_KEY);
  return requestsJson ? JSON.parse(requestsJson) : [];
};

export const addSwapRequest = (newRequestData: Omit<SwapRequest, 'id' | 'createdAt'>): SwapRequest => {
  const requests = getSwapRequests();
  const request: SwapRequest = {
    ...newRequestData,
    id: `req-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updatedRequests = [...requests, request];
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(updatedRequests));
  return request;
};

export const updateSwapRequest = (updatedRequest: SwapRequest): void => {
    const requests = getSwapRequests();
    const requestIndex = requests.findIndex(r => r.id === updatedRequest.id);
    if (requestIndex > -1) {
        requests[requestIndex] = updatedRequest;
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
    }
}
