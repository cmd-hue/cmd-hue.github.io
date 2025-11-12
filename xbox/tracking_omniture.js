function omnitureLogCustomEvent(tracking_tag)
{
    console.log("c" + tracking_tag);
    try{
        s.linkTrackVars = "prop36, events";
        //	s.prop11 = tracking_tag;
        s.prop36 = tracking_tag;
        s.events = "event1";
        s.tl(true, "o", tracking_tag);
    }
    catch (err) {
        console.log("S ISN'T DEFINED");
    }
}
