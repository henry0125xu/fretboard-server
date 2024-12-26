import { FretboardService } from "../../src/services/fretboard.service";
import { Fretboard } from "../../src/models/fretboard";
import { String } from "../../src/models/string";
import { Store } from "../../src/models/store";
import { Fret } from "../../src/models/fret";
import { FullNote } from "../../src/models/note";
import * as fretboardUtils from "../../src/utils/fretboardUtils";
import * as stringUtils from "../../src/utils/stringUtils";

describe("FretboardService class", () => {
  let mockFretboard: Fretboard;
  let mockStore: Store;
  let service: FretboardService;
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    mockFretboard = newMockFretboard();
    mockStore = {
      get: jest.fn().mockResolvedValue(mockFretboard),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    service = new FretboardService(mockStore);
  });

  describe("getFretboard method", () => {
    it("should return fretboard instance with correct process including fretboard initialization", async () => {
      const mockDefaultFretboard = newMockFretboard();
      const initializeFretboardSpy = jest
        .spyOn(fretboardUtils, "initializeFretboard")
        .mockImplementation(() => mockFretboard);

      const mockEmptyStore: Store = {
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn().mockResolvedValue(undefined),
        delete: jest.fn().mockResolvedValue(undefined),
      };
      const specificService = new FretboardService(mockEmptyStore);

      const gottenFretboard = await specificService.getFretboard("jaylenbrown");

      expect(mockEmptyStore.get).toHaveBeenCalledWith("jaylenbrown");
      expect(initializeFretboardSpy).toHaveBeenCalled();
      expect(mockEmptyStore.set).toHaveBeenCalledWith(
        "jaylenbrown",
        mockDefaultFretboard
      );
      expect(gottenFretboard).toEqual(mockDefaultFretboard);
    });
    it("should return Fretboard instance with correct process", async () => {
      const gottenFretboard = await service.getFretboard("paulgeorge");
      expect(mockStore.get).toHaveBeenCalledWith("paulgeorge");
      expect(mockFretboard).toEqual(gottenFretboard);
    });
  });
  describe("resetFretboard method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const initializeFretboardSpy = jest
        .spyOn(fretboardUtils, "initializeFretboard")
        .mockImplementation(() => mockFretboard);

      const gottenFretboard = await service.resetFretboard("kevindurant");

      expect(initializeFretboardSpy).toHaveBeenCalled();
      expect(mockStore.set).toHaveBeenCalledWith("kevindurant", mockFretboard);
      expect(mockFretboard).toEqual(gottenFretboard);
    });
  });
  describe("updateOpenString method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const mockString = new String();
      const getFretboardSpy = jest
        .spyOn(service, "getFretboard")
        .mockImplementation(async (_: string) => mockFretboard);
      const getStringSpy = jest
        .spyOn(fretboardUtils, "getString")
        .mockImplementation((_f: Fretboard, _i: number) => mockString);
      const updateOpenStringSpy = jest
        .spyOn(stringUtils, "updateOpenString")
        .mockImplementation((_s: String, _f: FullNote) => undefined);

      const gottenFretboard = await service.updateOpenString(
        "jimmybutler",
        "2",
        "C4"
      );

      expect(getFretboardSpy).toHaveBeenCalledWith("jimmybutler");
      expect(getStringSpy).toHaveBeenCalledWith(mockFretboard, 2);
      expect(updateOpenStringSpy).toHaveBeenCalledWith(
        mockString,
        "C4" as FullNote
      );
      expect(mockStore.set).toHaveBeenCalledWith("jimmybutler", mockFretboard);
      expect(gottenFretboard).toEqual(mockFretboard);
    });
  });
  describe("updateNumFrets method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const getFretboardSpy = jest
        .spyOn(service, "getFretboard")
        .mockImplementation(async (_: string) => mockFretboard);
      const updateNumFretsSpy = jest
        .spyOn(stringUtils, "updateNumFrets")
        .mockImplementation((_s: String, _n: number) => undefined);

      const gottenFretboard = await service.updateNumFrets("rjbarrett", "10");

      expect(getFretboardSpy).toHaveBeenCalledWith("rjbarrett");
      expect(updateNumFretsSpy).toHaveBeenCalledTimes(
        mockFretboard.strings.length
      );
      mockFretboard.strings.forEach((string, index) => {
        expect(updateNumFretsSpy).toHaveBeenNthCalledWith(
          index + 1,
          string,
          10
        );
      });
      expect(mockStore.set).toHaveBeenCalledWith("rjbarrett", mockFretboard);
      expect(gottenFretboard).toEqual(mockFretboard);
    });
  });
});

function newMockFretboard(): Fretboard {
  const fretboard = new Fretboard();
  fretboard.strings = Array.from({ length: 3 }, () => new String());
  fretboard.strings.forEach((string) => {
    string.frets = Array.from({ length: 10 }, () => new Fret());
  });
  return fretboard;
}
