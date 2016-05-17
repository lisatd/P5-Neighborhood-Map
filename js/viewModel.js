/**
 * Created by ldang on 5/17/2016.
 */

/**
 * Knockout view model function. Sets the observables for locations and handles filtering.
 */
function appViewModel() {
    var self = this;

    self.locations = ko.observableArray(locations);
    self.chosenLocationName = chosenLocationName = ko.observable(); // keeps track of selected location
    self.filterText = ko.observable();

    /**
     * Filter function to filter location by text input.
     */
    self.filteredLocations = ko.computed(function() {
        // Filter locations using array filter function.
        return locations.filter(function (location) {
            // If the location's name does not contain the input text (non-case-sensitive),
            if (location.name.toLowerCase().indexOf(self.filterText() ? self.filterText().toLowerCase() : '') === -1) {
                // hide the marker
                if (location.marker)
                    location.marker.setMap(null);
                return false;
            } else { // otherwise reveal the marker if already hidden
                if (location.marker)
                    location.marker.setMap(map);
                return true;
            }
        });
    });

    /**
     * Click function to open the location in the map's infoWindow when clicked in the text list.
     * @param location
     */
    self.openInfoWindow = function(location) {
        openLocationInfo(location);
        self.chosenLocationName(location.name);
    };
}

ko.applyBindings(new appViewModel());