/**
 * Created by ldang on 5/17/2016.
 */
function appViewModel() {
    var self = this;

    self.locations = ko.observableArray(locations);
    self.chosenLocationName = chosenLocationName = ko.observable();
    self.filterText = ko.observable();

    self.filteredLocations = ko.computed(function() {
        return locations.filter(function (location) {
            if (location.name.toLowerCase().indexOf(self.filterText() ? self.filterText().toLowerCase() : '') === -1) {
                if (location.marker)
                    location.marker.setMap(null);
                return false;
            } else {
                if (location.marker)
                    location.marker.setMap(map);
                return true;
            }
        });
    });

    self.openInfoWindow = function(location) {
        openLocationInfo(location);
        self.chosenLocationName(location.name);
    };
}

ko.applyBindings(new appViewModel());