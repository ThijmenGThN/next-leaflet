import * as migration_20250613_102937 from "./20250613_102937";
import * as migration_20250614_135146 from "./20250614_135146";

export const migrations = [
	{
		up: migration_20250613_102937.up,
		down: migration_20250613_102937.down,
		name: "20250613_102937",
	},
	{
		up: migration_20250614_135146.up,
		down: migration_20250614_135146.down,
		name: "20250614_135146",
	},
];
