#Summary
SeeClickFix is a platform for residents of a city to report non emergency issues to their city. This visualization looks at the number of Tree Trimming Requests reported in New Haven, Connecticut by month. The number of tree trimming issues has a periodic trend, with a large increase in the number of issues being reported during the second half of each year.

#Design
###Chart:
A line chart is used to emphasize the cyclical nature of the Tree Trimming Issues.

An opaque rectangle is place over the second half of every year both in order to draw attention to the annual peaks in the graph, and to give the user a better sense of the timing of the data.

Data from 2015 is left out, since it does not represent a full year, and may confuse the message of the periodic trend. Data before 2011 is also left out, since there are few data points

###Map:
Issues are plotted as points on a map, with one map for Issues in the earlier half of the year and another map for issues in the second half. Issues are represented by opaque green circles, so that the Second Map --representing issues reported in the second half of the year-- appears more dense and solid.

This reinforces the trend that more issues are reported during the second half of the year.

The second chart has a gray background, which helps the user to associate it with the chart above, where the second half of each year is covered by a grey rectangle.

The map also reinforces that the data is local to New Haven, Connecticut.

#Feedback

###V1.0
The initial visualization was a tool for users to explore the data. It consisted of a map of issues and a number of tools for filtering the issues that show on the map.

The code for the first visualization can be found in archive/v1.0/aggregationv1.0, and the visualization can be viewed at: http://allanvisochek.com/active_version/aggregationv1.0

Feedback for this version generally reflected a lack of ability to gain insights from the data and to see trends. Users were able to use the interface well, but were not able to gain useful information.

###V2
The second visualization was an attempt to allow users to visualize the government's response to issues. The visualization consisted of a charts showing the number of issues created, acknowledged and resolved over time, along with a bar chart of the fix times of the resolved issues.

The code for the second visualization can be found in archive/v2.0/, and the visualization can be viewed at: http://allanvisochek.com/charts/charts.html

For this visualization, I received feedback that it was hard to interpret the data because of a few ambiguities that were pointed out to me. For one, the number of issues resolved does not take into account the seriousness of each issue. For another, the fix times of the issues did not reflect the time since the data collection began.

It was also pointed out to me that there were interesting periodic trends in the Tree Trimming issues, which led to the next visualization.

###V3
The third visualization was an attempt to show the periodicity of the number of Tree Trimming issues reported using an animation and a chart.

The code for the third visualization can be found in archive/v3.0/, and the visualization can be viewed at: http://allanvisochek.com/tree_animation/tree_animation/

The feedback that I received on this version was that:
1. The animation was not particularly useful, since it was hard to see the trends with all of the moving points.

2. The trends on the graph were hard to visualize because of the low number of issues in the first few years, and because there were no breaks to indicate the start and end of each year.

In order to account for this, I drew opaque rectangles over the second half of each year, and made the map smaller, static and below the chart, with one map for the first half of the year, and another map for the second, as outlined in the design section.

#Resources
please see sources.txt
