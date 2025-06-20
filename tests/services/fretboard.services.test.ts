import { FretboardService } from "../../src/services/fretboard.service";
import { Fretboard } from "../../src/models/fretboard";
import { String } from "../../src/models/string";
import { Store } from "../../src/models/store";
import { Fret } from "../../src/models/fret";
import { User } from "../../src/models/user";
import { FullNote } from "../../src/models/note";
import {
  NonePressStrategy,
  PitchClassPressStrategy,
  PressStrategy,
} from "../../src/models/pressStrategy";
import * as fretboardUtils from "../../src/utils/fretboard.utils";
import * as stringUtils from "../../src/utils/string.utils";
import * as pressStrategyUtils from "../../src/utils/pressStrategy.utils";
import * as notesUtils from "../../src/utils/note.utils";

const mockNumStrings = 3;
const mockNumFrets = 10;
let mockFretboard: Fretboard;
let mockPressStrategy: PressStrategy;
let mockUser: User;
let mockStore: Store;
let service: FretboardService;
describe("FretboardService class", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    mockFretboard = newMockFretboard();
    mockPressStrategy = new NonePressStrategy();
    mockUser = {
      id: "jaylenbrown",
      fretboard: mockFretboard,
      pressStrategy: mockPressStrategy,
    };
    mockStore = {
      get: jest.fn().mockResolvedValue(mockUser),
      set: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    service = new FretboardService(mockStore);
  });

  describe("getFretboard method", () => {
    it("should return fretboard instance with correct process including fretboard initialization", async () => {
      const initializeFretboardSpy = jest
        .spyOn(fretboardUtils, "initializeFretboard")
        .mockImplementation(() => mockFretboard);
      (mockStore.get as jest.Mock).mockResolvedValueOnce(null);

      const gottenFretboard = await service.getFretboard("jaylenbrown");

      expect(mockStore.get).toHaveBeenCalledWith("jaylenbrown");
      expect(initializeFretboardSpy).toHaveBeenCalled();
      expect(mockStore.set).toHaveBeenCalledWith("jaylenbrown", mockUser);
      expect(gottenFretboard).toBe(mockFretboard);
    });
    it("should return Fretboard instance with correct process", async () => {
      const gottenFretboard = await service.getFretboard("paulgeorge");
      expect(mockStore.get).toHaveBeenCalledWith("paulgeorge");
      expect(mockFretboard).toBe(gottenFretboard);
    });
  });

  describe("resetFretboard method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const initializeFretboardSpy = jest
        .spyOn(fretboardUtils, "initializeFretboard")
        .mockImplementation(() => mockFretboard);
      const initializePressStrategySpy = jest
        .spyOn(pressStrategyUtils, "initializePressStrategy")
        .mockImplementation(() => mockPressStrategy);

      const gottenFretboard = await service.resetFretboard("kevindurant");

      expect(initializeFretboardSpy).toHaveBeenCalled();
      expect(initializePressStrategySpy).toHaveBeenCalledWith("none");
      expect(mockFretboard).toBe(gottenFretboard);
    });
  });

  describe("insertString method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const mockInsertedString = new String();
      const initailizeStringSpy = jest
        .spyOn(stringUtils, "initailizeString")
        .mockImplementation((_o: FullNote, _n: number) => mockInsertedString);
      const insertStringSpy = jest
        .spyOn(fretboardUtils, "insertString")
        .mockImplementation(
          (_f: Fretboard, _s: String, _i: number) => undefined
        );

      const gottenFretboard = await service.insertString(
        "jamesharden",
        "3",
        "Db5"
      );

      expect(initailizeStringSpy).toHaveBeenCalledWith(
        "Db5" as FullNote,
        mockNumFrets
      );
      expect(insertStringSpy).toHaveBeenCalledWith(
        mockFretboard,
        mockInsertedString,
        3
      );
      expect(gottenFretboard).toBe(mockFretboard);
    });
  });

  describe("deleteString method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const deleteStringSpy = jest
        .spyOn(fretboardUtils, "deleteString")
        .mockImplementation((_f: Fretboard, _i: number) => undefined);

      const gottenFretboard = await service.deleteString("kyrieirving", "3");

      expect(deleteStringSpy).toHaveBeenCalledWith(mockFretboard, 3);
      expect(gottenFretboard).toBe(mockFretboard);
    });
  });

  describe("updateOpenString method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const mockString = new String();
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

      expect(getStringSpy).toHaveBeenCalledWith(mockFretboard, 2);
      expect(updateOpenStringSpy).toHaveBeenCalledWith(
        mockString,
        "C4" as FullNote
      );
      expect(gottenFretboard).toBe(mockFretboard);
    });
  });

  describe("updateNumFrets method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const updateNumFretsSpy = jest
        .spyOn(stringUtils, "updateNumFrets")
        .mockImplementation((_s: String, _n: number) => undefined);

      const gottenFretboard = await service.updateNumFrets("rjbarrett", "10");

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
      expect(gottenFretboard).toBe(mockFretboard);
    });
  });

  describe("pressBasicNotes method", () => {
    it("should return Fretboard instance with correct process", async () => {
      const initializePressStrategySpy = jest
        .spyOn(pressStrategyUtils, "initializePressStrategy")
        .mockImplementationOnce(() => new PitchClassPressStrategy());
      const mockPitchClassBitmap = [
        false,
        true,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
      ];
      const getPitchClassBitmapSpy = jest
        .spyOn(notesUtils, "getPitchClassBitmap")
        .mockReturnValue(mockPitchClassBitmap);

      const gottenFretboard = await service.pressNotes("derrickrose", [
        "Eb",
        "G",
        "Bb",
        "Db",
      ]);

      expect(initializePressStrategySpy).toHaveBeenCalledWith("pitch-class");
      expect(getPitchClassBitmapSpy).toHaveBeenCalledWith([
        "Eb",
        "G",
        "Bb",
        "Db",
      ]);
      expect(mockUser.pressStrategy).toBeInstanceOf(PitchClassPressStrategy);
      expect(mockUser.pressStrategy.state).toEqual(mockPitchClassBitmap);
      expect(gottenFretboard).toBe(mockFretboard);
    });
  });
});

const newMockFretboard = (): Fretboard => {
  const fretboard = new Fretboard();
  fretboard.strings = Array.from(
    { length: mockNumStrings },
    () => new String()
  );
  fretboard.strings.forEach((string) => {
    string.frets = Array.from({ length: mockNumFrets }, () => new Fret());
  });
  return fretboard;
};
