//------------------------------
//			mapInitialize
//------------------------------

var objMap, objGeoCoder

function mapInitialize(div) {
	if (GBrowserIsCompatible()) {
		objMap = new GMap2($("#"+div)[0]);
		objMap.enableContinuousZoom();
		objGeoCoder = new GClientGeocoder();
		objMap.enableContinuousZoom();
		objMap.enableScrollWheelZoom();
		objMap.addControl(new GLargeMapControl3D());
		objMap.setCenter(new GLatLng(48.773819,18.616751), 16, G_NORMAL_MAP);
	}
}


//------------------------------
//				mapAddDealer
//------------------------------

function mapAddDealer(strAddress, strDescription) {
	if (GBrowserIsCompatible()) objGeoCoder.getLatLng(strAddress, function(objPoint) {
		if (objPoint) {
			var objMarker = new GMarker(objPoint);
			objMap.addOverlay(objMarker);
			GEvent.addListener(objMarker, "click", function() {objMarker.openInfoWindowTabsHtml(strDescription)});
		}
	});
}


//------------------------------
//				mapAddPoint
//------------------------------

function mapAddPoint(coords, strDescription) {
	if (GBrowserIsCompatible())
	{
		var coords_new = coords.split(",");
		var x = $.trim(coords_new[0]);
		var y = $.trim(coords_new[1]);
		var point = new GLatLng(x, y);

		var objMarker = createMarker(point);
		objMap.addOverlay(objMarker);
		GEvent.addListener(objMarker, "click", function() {objMarker.openInfoWindowTabsHtml(strDescription)});
	}
}

//------------------------------
//			createMarker
//------------------------------

function createMarker(point) 
{
	var baseIcon = new GIcon(G_DEFAULT_ICON);
	baseIcon.image = "/images/web/layout/map_pin.png";
	baseIcon.iconSize = new GSize(15, 32);
	baseIcon.shadow = "/images/web/layout/map_pin_shadow.png";
    baseIcon.shadowSize = new GSize(25, 32);
	markerOptions = { icon:baseIcon };
	var marker = new GMarker(point, markerOptions);

	return marker;
}