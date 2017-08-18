export default function(props) {
	if (!props.route || !props.routes || !props.location) {
		throw new Error("Missing props from React router.")
	}
	var getUrl = window.location;
	var route = props.route
	var routeDepth = props.routes.indexOf(route)
	return getUrl .protocol + "//" + getUrl.host + "/";

	//props.location.pathname.split("/").slice(0, routeDepth+1).join("/")
}