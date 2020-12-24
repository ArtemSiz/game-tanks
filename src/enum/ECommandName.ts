/**
 *  iSOFTBET
 *  Copyright 2018 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by Andrii Barvynko on 27-Nov-2018.
 */
export enum ECommandName {
	START_SCENE_DRAW_TEMPLATE   = "StartSceneDrawTemplate",
	PRELOADER_SCENE_DRAW_TEMPLATE   = "PreloaderSceneDrawTemplate",
	MAIN_SCENE_DRAW_TEMPLATE   = "MainSceneDrawTemplate",
	END_SCENE_DRAW_TEMPLATE   = "EndSceneDrawTemplate",

	MAIN_SCENE_UPDATE_FRAME   = "MainSceneUpdateFrame",
	CHECK_STATUS_GAME   = "CHECK_STATUS_GAME",

	PRESS_START_BUTTON   = "PressStartButton",
	LOAD_ASSETS   = "LoadAssets",
	LOADING_COMPLETED   = "LoadingCompleted"
}
