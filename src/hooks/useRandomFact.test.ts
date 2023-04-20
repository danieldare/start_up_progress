import { renderHook } from '@testing-library/react';
import { useRandomFact } from './useRandomFact';
import { waitFor } from '@testing-library/react';
const axios = require('axios');

jest.mock('axios');

describe('useRandomFact', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch random fact when trigger is true', async () => {
    const mockData = {
      text: 'Random fact text',
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useRandomFact(true));

    expect(result.current[0]).toBeTruthy(); // isLoading
    expect(result.current[1]).toBeNull(); // error
    expect(result.current[2]).toBeNull(); // randomFact

    await waitFor(() => expect(result.current[0]).toBeFalsy()); // waitFor isLoading

    expect(result.current[1]).toBeNull(); // error
    expect(result.current[2]).toEqual(mockData); // randomFact

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://uselessfacts.jsph.pl/random.json?language=en');
  });

  it('should not fetch random fact when trigger is false', () => {
    const { result } = renderHook(() => useRandomFact(false));

    expect(result.current[0]).toBeFalsy(); // isLoading
    expect(result.current[1]).toBeNull(); // error
    expect(result.current[2]).toBeNull(); // randomFact

    expect(axios.get).toHaveBeenCalledTimes(0);
  });

  it('should handle fetch error', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch random fact'));

    const { result } = renderHook(() => useRandomFact(true));

    expect(result.current[0]).toBeTruthy(); // isLoading
    expect(result.current[1]).toBeNull(); // error
    expect(result.current[2]).toBeNull(); // randomFact

    await waitFor(() => expect(result.current[0]).toBeFalsy()); // waitFor isLoading

    expect(result.current[1]).toEqual('Failed to fetch random fact'); // error
    expect(result.current[2]).toBeNull(); // randomFact

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://uselessfacts.jsph.pl/random.json?language=en');
  });
});
