import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type IconComponentType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
	muiName: string;
}

export interface NavRoute {
	path: string;
	name: string;
	IconComponent: IconComponentType
}

export interface NavRouteType {
	name: string;
	routes: NavRoute[];
}