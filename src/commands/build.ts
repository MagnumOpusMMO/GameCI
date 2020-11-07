import { exec } from 'child_process'
import {Command} from '@oclif/command'
import {
  getBuildType,
  getPlatformType, PathBuilder,
} from "../lib/common";
import {build} from "../features/build";

export default class Build extends Command {
  static description = 'Build your project'
  private pathBuilder: PathBuilder = new PathBuilder(this.config.configDir)

  async run() {
    await this.pathBuilder.init()

    const platform: string = await getPlatformType()
    const buildType: string = await getBuildType()

    const command: string = build(buildType, platform, this.pathBuilder)

    exec(command, (err, stdout, stderr) => {
	  console.log(stderr)
      if (err) {
        this.log(JSON.stringify(stderr))
        this.log(JSON.stringify(err))
      } else {
        this.log('BUILT')
      }
    });
  }
}

// "build:client:mac": "/Users/peterchau/UnrealEngine/Engine/Build/BatchFiles/RunUAT.sh BuildCookRun -project=\"/Users/peterchau/Magnum-Opus/MagnumOpus.uproject\" -noP4 -platform=Mac -build -clientconfig=Shipping -serverconfig=Shipping -cook -allmaps -stage -pak -archive -archivedirectory=\"/Users/peterchau/Desktop/magnum/Builds/Client\"",
//
// "build:server:mac": "/Users/peterchau/UnrealEngine/Engine/Build/BatchFiles/RunUAT.sh BuildCookRun -project=\"/Users/peterchau/Magnum-Opus/MagnumOpus.uproject\" -noP4 -platform=Mac -build -clientconfig=Shipping -serverconfig=Shipping -cook -server -serverplatform=Win64 -noclient -allmaps -stage -pak -archive -archivedirectory=\"/Users/peterchau/Desktop/magnum/Builds/Server\"",
//
//   "build:client:win": "D:\\UnrealEngine\\Engine\\Build\\BatchFiles/RunUAT BuildCookRun -project=\"D:\\Magnum-Opus\\MagnumOpus.uproject\" -noP4 -platform=Win64 -build -clientconfig=Shipping -serverconfig=Shipping -cook -allmaps -stage -pak -archive -archivedirectory=\"D:\\Builds\\Client\"",
//
//   "build:server:win": "D:\\UnrealEngine\\Engine\\Build\\BatchFiles/RunUAT BuildCookRun -project=\"D:\\Magnum-Opus\\MagnumOpus.uproject\" -noP4 -platform=Win64 -build -clientconfig=Shipping -serverconfig=Shipping -cook -server -serverplatform=Win64 -noclient -allmaps -stage -pak -archive -archivedirectory=\"D:\\Builds\\Server\"",
