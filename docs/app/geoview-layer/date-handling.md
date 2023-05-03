# Date Handling

The GeoView application uses two data types to process dates internally. The type of data used varies depending on the layer. All vector layers use numbers and, so far, the raster layers that can be queried use strings. In addition, dates are internally considered as coded in Universal Coordinated Time (UTC) and the time reference for numeric dates is the elapsed time in miliseconds since midnight on January 1, 1970.

To be a date, a field must be declared as such in the metadata returned by the service endpoint or in the geoview configuration, the latter overriding the former. It happens sometimes that some services do not format their date fields according to the ISO UTC standards. In such cases, it is possible with the configuration parameter `serviceDateFormat` to provide the viewer with the format used by the server in order to perform the desired conversion. It is not necessary to use this parameter if the dates are already in ISO UTC format, but if you use it all interactions with the affected layers will have to respect the format you have specified.

Ok But, from a programmer's point of view, how does it work? Well, the viewer needs to be able to handle data from two types of services. Those which do not allow to keep a local copy of the data and those for which it is possible to keep one. In the first case, when the user applies a view filter, the viewer will convert the filter's date constants (those with the syntax date '...') from the display format to the format used by the server but applying the inverse of the time zone to ensure that the request is in the correct time zone. In the second case, the conversion only takes into account the order of the fields and uses the UTC time zone since the data is converted into the ISO UTC format when read. This is the case for vector layers. It is important to remember that specifying a time zone on a view filter is useless since the conversion algorithm described above will delete it and replace it with a new value.

When using the `getFeatureInfo` method, if the result contains a date, it will be converted to a ***string respecting the ISO UTC*** date format. This conversion from internal format to a string is done for display purposes. The user can choose to reformat this date according to a patern by specifying the date fields he wants to keep using the `outputDateFormat` configuration parameter, but this transformation will not change the fact that dates are still encoded according to ***Universal Coordinated Time***. It is imperative that the output format respects the input format of the service, otherwise conversion errors will be logged in the console and request processing will be interrupted.

We have put a lot of effort into ensuring that the behavior when manipulating date fields is consistent across GeoView layer types. For example, ESRI Dynamic layers do not support the use of an ISO date format. The 'T' separator normally placed between the date and time is not recognized, a space must be used instead. Also, the time zone is not accepted. To solve this problem, the time zone will be cut off and the time separator will be replaced by a space when the user uses them. These operations are done in the background by the viewer in order to present a uniform behavior in the user interface. Another place where dates are not used as mentioned in the service documentation of the underlying layer is in the WMS layers. The temporal filter cannot be written as mentioned in the specifcations. The dates must be presented using the `date '...'` operator in order for them to be correctly processed by the viewer. The translation to the format expected by the service will be done in the background.