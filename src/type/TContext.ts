import {GameEndSceneContext} from "../scenes/game_end_scene/GameEndSceneContext";
import {GameMainSceneContext} from "../scenes/game_main_scene/GameMainSceneContext";
import {GamePreloaderSceneContext} from "../scenes/game_preloader_scene/GamePreloaderSceneContext";
import {GameStartSceneContext} from "../scenes/game_start_scene/GameStartSceneContext";

export type TContext = GameStartSceneContext | GamePreloaderSceneContext | GameMainSceneContext | GameEndSceneContext;
