import { useEffect } from "react";
import './ChartComponent.css';

const AmChartComponent = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.amcharts.com/lib/5/index.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = "https://cdn.amcharts.com/lib/5/xy.js";
    script2.async = true;

    const script3 = document.createElement("script");
    script3.src = "https://cdn.amcharts.com/lib/5/themes/Animated.js";
    script3.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);

    const initChart = () => {
      if (!window.am5) return;

      window.am5.ready(function () {
        const root = window.am5.Root.new("chartdiv");
        root.setThemes([window.am5themes_Animated.new(root)]);

        const data = [
          { name: "Netflix", steps: 24, pictureSettings: { src: "/netflix.svg", barColor: 0xD20606, bulletColor: 0x111111 } },
          { name: "Prime", steps: 35, pictureSettings: { src: "/prime.svg", barColor: 0x0662BE, bulletColor: 0x004466 } },
          { name: "Youtube", steps: 9, pictureSettings: { src: "/youtube.svg", barColor: 0xD20606, bulletColor: 0x660000 } },
          { name: "Canva", steps: 15, pictureSettings: { src: "/canva.svg", barColor: 0x06A3A9, bulletColor: 0x660000 } },
          { name: "Spotify", steps: 5, pictureSettings: { src: "/spotify.svg", barColor: 0x1D9A49, bulletColor: 0x000000 } },
          { name: "IPTV", steps: 10, pictureSettings: { src: "/iptv.svg", barColor: 0x42066E, bulletColor: 0xB8860B } }
        ];

        const chart = root.container.children.push(
          window.am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingBottom: 50,
            paddingTop: 40,
            paddingLeft: 0,
            paddingRight: 0
          })
        );

        const xRenderer = window.am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 60
        });
        xRenderer.grid.template.set("visible", false);

        const xAxis = chart.xAxes.push(
          window.am5xy.CategoryAxis.new(root, {
            paddingTop: 40,
            categoryField: "name",
            renderer: xRenderer
          })
        );
  
        const yRenderer = window.am5xy.AxisRendererY.new(root, {});
        yRenderer.grid.template.set("strokeDasharray", [3]);

        const yAxis = chart.yAxes.push(
          window.am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: yRenderer
          })
        );

        const series = chart.series.push(
          window.am5xy.ColumnSeries.new(root, {
            name: "Income",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "steps",
            categoryXField: "name",
            sequencedInterpolation: true,
            calculateAggregates: true,
            maskBullets: false,
            tooltip: window.am5.Tooltip.new(root, {
              dy: -30,
              pointerOrientation: "vertical",
              labelText: "{valueY}",
              label: {
                fill: am5.color(0xFFFFFF) // Change tooltip text color to white
              }
            })
          })
        );

        // Fixed barColor adapter path
        series.columns.template.adapters.add("fill", function (fill, target) {
          return window.am5.color(target.dataItem?.dataContext.pictureSettings?.barColor ?? 0xcccccc);
        });

        series.columns.template.setAll({
          strokeOpacity: 0,
          cornerRadiusBR: 10,
          cornerRadiusTR: 10,
          cornerRadiusBL: 10,
          cornerRadiusTL: 10,
          maxWidth: 50,
          fillOpacity: 0.8,
          label: {
            fill: am5.color(0xFFFFFF) // Change column label text color to white
          }
        });

        let currentlyHovered;

        series.columns.template.events.on("pointerover", function (e) {
          handleHover(e.target.dataItem);
        });

        series.columns.template.events.on("pointerout", function () {
          handleOut();
        });

        function handleHover(dataItem) {
          if (dataItem && currentlyHovered !== dataItem) {
            handleOut();
            currentlyHovered = dataItem;
            const bullet = dataItem.bullets[0];
            bullet.animate({
              key: "locationY",
              to: 1,
              duration: 600,
              easing: window.am5.ease.out(window.am5.ease.cubic)
            });
          }
        }

        function handleOut() {
          if (currentlyHovered) {
            const bullet = currentlyHovered.bullets[0];
            bullet.animate({
              key: "locationY",
              to: 0,
              duration: 600,
              easing: window.am5.ease.out(window.am5.ease.cubic)
            });
          }
        }

        const circleTemplate = window.am5.Template.new({});

        series.bullets.push(function (root, series, dataItem) {
          const bulletContainer = window.am5.Container.new(root, {});

          const circle = bulletContainer.children.push(
            window.am5.Circle.new(root, {
              radius: 25,
              fill: window.am5.color(dataItem.dataContext.pictureSettings?.bulletColor ?? 0x000000)
            })
          );

          const maskCircle = bulletContainer.children.push(
            window.am5.Circle.new(root, { radius: 25 })
          );

          const imageContainer = bulletContainer.children.push(
            window.am5.Container.new(root, { mask: maskCircle })
          );

          imageContainer.children.push(
            window.am5.Picture.new(root, {
              templateField: "pictureSettings",
              centerX: window.am5.p50,
              centerY: window.am5.p50,
              width: 30,
              height: 30
            })
          );

          return window.am5.Bullet.new(root, {
            locationY: 0,
            sprite: bulletContainer
          });
        });

        series.data.setAll(data);
        xAxis.data.setAll(data);

        const cursor = chart.set("cursor", window.am5xy.XYCursor.new(root, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        cursor.events.on("cursormoved", function () {
          const dataItem = series.get("tooltip").dataItem;
          if (dataItem) {
            handleHover(dataItem);
          } else {
            handleOut();
          }
        });

        series.appear();
        chart.appear(1000, 100);
      });
    };

    const interval = setInterval(() => {
      if (window.am5 && window.am5xy) {
        clearInterval(interval);
        initChart();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (window.am5 && window.am5.registry.rootElements[0]) {
        window.am5.registry.rootElements[0].dispose();
      }
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default AmChartComponent;
