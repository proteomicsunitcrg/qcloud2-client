import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../../../services/maps.service';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { NodeAndStats } from '../../../../models/NodeAndStats';
declare let ol: any;
@Component({
  selector: 'app-maps-map',
  templateUrl: './maps-map.component.html',
  styleUrls: ['./maps-map.component.css']
})
export class MapsMapComponent implements OnInit {

  constructor(private mapService: MapsService, private nodeService: NodeIntranetService) { }

  // Nodes retrived
  allNodes: NodeAndStats[];
  // Var to store the map
  map: any;
  // The icon style
  iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.9], // set the center point at the top of the image
      src: 'assets/icons/marker.png',
      scale: 0.01,
    })
  });

  ngOnInit() {
    this.getAllNodesAndMarkers();
    this.createMap();
  }

  /**
   * Justs creates the map targetting the div#map and center the view
   */
  private createMap(): void {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([2.193925, 41.385274]),
        zoom: 3
      })
    });
  }

  /**
   * Retrieves all the nodes and mounts the markers for every node, the
   * implements the markers to the map
   */
  private getAllNodesAndMarkers(): void {
    // retrieve all nodes
    this.nodeService.getAllNodes().subscribe(
      res => {
        this.allNodes = res;
        for (const node of this.allNodes) {
          // for every node we get his coords
          this.mapService.getPlaceByCountry(node.node.country).subscribe(
            res => {
              // object to store the node and his coords
              const nodeWithLocation = { node: node, location: res[0] }
              const layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                  features: [
                    new ol.Feature({
                      // set the marker with the coords
                      geometry: new ol.geom.Point(ol.proj.fromLonLat([nodeWithLocation.location.lon, nodeWithLocation.location.lat])),
                      name: nodeWithLocation.node.node.name
                    })
                  ]
                })
              });
              layer.setStyle(this.iconStyle); // add the style defined at the beggining
              this.map.addLayer(layer); // add the layer(marker to the map)
            },
            err => console.error(err)
          );
        }
      },
      err => console.error(err)
    );
  }
}
