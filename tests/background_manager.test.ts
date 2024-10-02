import { BackgroundManager } from "../js/background/background_manager.js";
import { backgroundImageToyosuCenterBuilding } from "../js/background/ai_ceo/background_image_toyosu_center_building.js";
import { backgroundImageToyosuCenterBuildingEntrance } from "../js/background/ai_ceo/background_image_toyosu_center_building_entrance.js";
import { backgroundImageInforiumEntrance } from "../js/background/ai_ceo/background_image_inforium_entrance.js";
import { backgroundImageInforium } from "../js/background/ai_ceo/background_image_inforium.js";
import { backgroundImageInforiumMeetingArea } from "../js/background/ai_ceo/background_image_inforium_meeting_area.js";
import { backgroundImageInforiumPresentationArea } from "../js/background/ai_ceo/background_image_inforium_presentation_area.js";
import { backgroundImageInforiumWorkshopArea } from "../js/background/ai_ceo/background_image_inforium_workshop_area.js";
import { backgroundIframeFactoryDigitalTwin } from "../js/background/ai_ceo/background_iframe_factory_digital_twin.js";
import { backgroundIframeNttDataInnovationsHistory } from "../js/background/ai_ceo/background_image_nttdata_innovations_history.js";

describe("test_background_manager", () => {
  var backgroundManager;

  beforeEach(async () => {
    backgroundManager = new BackgroundManager({
      document: null,
      backgroundList: [
        backgroundImageToyosuCenterBuilding,
        backgroundImageToyosuCenterBuildingEntrance,
        backgroundImageInforiumEntrance,
        backgroundImageInforium,
        backgroundImageInforiumMeetingArea,
        backgroundImageInforiumPresentationArea,
        backgroundImageInforiumWorkshopArea,
        backgroundIframeFactoryDigitalTwin,
        backgroundIframeNttDataInnovationsHistory,
      ],
      language: "English",
    }
    );
  });

  afterEach(() => { });

  test("BackgroundManager.getCurrentBackground()", async () => {
    backgroundManager.changeBackground({ index: 0 });
    expect(
      backgroundManager.getCurrentBackground().names["English"]).toEqual(
        "Toyosu Center Building"
      );

    backgroundManager.changeBackground({ index: 1 });
    expect(
      backgroundManager.getCurrentBackground().names["English"]).toEqual(
        "Toyosu Center Building Entrance"
      );
  });
});
