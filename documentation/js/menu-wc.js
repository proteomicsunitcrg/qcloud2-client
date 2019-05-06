'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">qcloud2-client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdministrationModule.html" data-type="entity-link">AdministrationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' : 'data-target="#xs-components-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' :
                                            'id="xs-components-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' }>
                                            <li class="link">
                                                <a href="components/AllPeptidesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AllPeptidesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartContextSourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartContextSourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartCvsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartCvsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartParamComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartParamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartSampleTypeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartSampleTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ColorListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContextSourceDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContextSourceDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CvFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CvFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CvListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CvListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CvSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CvSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultViewGeneratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DefaultViewGeneratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstrumentSampleFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstrumentSampleFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstrumentSampleListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstrumentSampleListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainColorManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainColorManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainContextSourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainContextSourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainCvComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainCvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainDefaultViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainDefaultViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainGuideSetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainGuideSetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainNonConformitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainNonConformitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainParametersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainParametersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainSampleTypeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainSampleTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainThresholdComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainThresholdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParametersFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParametersFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParametersListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParametersListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PeptideDetailFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PeptideDetailFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PeptidesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PeptidesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProblemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProblemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleCompositionFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleCompositionFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SamplePeptidesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SamplePeptidesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleTypeCategoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleTypeCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleTypeFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleTypeFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleTypeListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleTypeListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SampleTypeSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleTypeSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThresholdBuilderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThresholdBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThresholdListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThresholdListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TroubleshootingFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TroubleshootingFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TroubleshootingListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TroubleshootingListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' : 'data-target="#xs-injectables-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' :
                                        'id="xs-injectables-links-module-AdministrationModule-7922ded428ec5fa606b3852fb215c736"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ChartParamsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChartParamsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ChartService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContextSourceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ContextSourceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CvService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CvService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InstrumentSampleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InstrumentSampleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ParametersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ParametersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PeptideService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PeptideService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SampleCompositionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SampleCompositionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SampleTypeCategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SampleTypeCategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SampleTypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SampleTypeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ThresholdService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThresholdService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TraceColorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TraceColorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdministrationRouterModule.html" data-type="entity-link">AdministrationRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ApplicationModule.html" data-type="entity-link">ApplicationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' : 'data-target="#xs-components-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' :
                                            'id="xs-components-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' }>
                                            <li class="link">
                                                <a href="components/AnnotationListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnnotationListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnnotationListItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnnotationListItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnnotationMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnnotationMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnnotationSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnnotationSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataVisualizationDateMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataVisualizationDateMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataVisualizationDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataVisualizationDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataVisualizationMainWindowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataVisualizationMainWindowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataVisualizationSideMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataVisualizationSideMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileInformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstrumentStatusComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstrumentStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IsotopologueInformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsotopologueInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainWindowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainWindowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WelcomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WelcomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' : 'data-target="#xs-injectables-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' :
                                        'id="xs-injectables-links-module-ApplicationModule-18c4228a8ff346afa2dd2892be30226a"' }>
                                        <li class="link">
                                            <a href="injectables/AnnotationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AnnotationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataSourceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataSourceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FileService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlotService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlotService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SampleCompositionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SampleCompositionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SampleTypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SampleTypeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ApplicationRouterModule.html" data-type="entity-link">ApplicationRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' : 'data-target="#xs-components-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' :
                                            'id="xs-components-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' : 'data-target="#xs-injectables-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' :
                                        'id="xs-injectables-links-module-AppModule-7a852bbd68e4275c89e4df956a85362d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ModalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SystemService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SystemService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ThresholdService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThresholdService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TroubleshootingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TroubleshootingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ViewService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WebsocketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WebsocketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigurationModule.html" data-type="entity-link">ConfigurationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' : 'data-target="#xs-components-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' :
                                            'id="xs-components-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' }>
                                            <li class="link">
                                                <a href="components/DefaultViewSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DefaultViewSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainUserViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainUserViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordChangeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PasswordChangeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserViewBuilderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserViewBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserViewListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserViewListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' : 'data-target="#xs-injectables-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' :
                                        'id="xs-injectables-links-module-ConfigurationModule-dcd44b09c5271b785e18db5cb6799f93"' }>
                                        <li class="link">
                                            <a href="injectables/UserDefaultViewService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserDefaultViewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigurationRouterModule.html" data-type="entity-link">ConfigurationRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EntryPointModule.html" data-type="entity-link">EntryPointModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' : 'data-target="#xs-components-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' :
                                            'id="xs-components-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' }>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordRecoveryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PasswordRecoveryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' : 'data-target="#xs-injectables-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' :
                                        'id="xs-injectables-links-module-EntryPointModule-cb5df2a1563daa359bf2a16d5def6541"' }>
                                        <li class="link">
                                            <a href="injectables/ModalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PasswordResetService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PasswordResetService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RegistrationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RegistrationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntryPointRouterModule.html" data-type="entity-link">EntryPointRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManagementModule.html" data-type="entity-link">ManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' : 'data-target="#xs-components-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' :
                                            'id="xs-components-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' }>
                                            <li class="link">
                                                <a href="components/DataSourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataSourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataSourceGuideSetListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataSourceGuideSetListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataSourceListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataSourceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GuideSetInformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GuideSetInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainSystemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainSystemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SystemBuilderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SystemBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SystemListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SystemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' : 'data-target="#xs-injectables-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' :
                                        'id="xs-injectables-links-module-ManagementModule-c24b1f30f8f4c5cc64cdd39cbea23ca4"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ChartService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CvService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CvService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataSourceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataSourceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GuideSetService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GuideSetService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ParametersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ParametersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManagementRouterModule.html" data-type="entity-link">ManagementRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModalModuleModule.html" data-type="entity-link">ModalModuleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalModuleModule-1379f030615c2a814cfae9cf290268af"' : 'data-target="#xs-components-links-module-ModalModuleModule-1379f030615c2a814cfae9cf290268af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalModuleModule-1379f030615c2a814cfae9cf290268af"' :
                                            'id="xs-components-links-module-ModalModuleModule-1379f030615c2a814cfae9cf290268af"' }>
                                            <li class="link">
                                                <a href="components/BottomModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BottomModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlotsModule.html" data-type="entity-link">PlotsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' : 'data-target="#xs-components-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' :
                                            'id="xs-components-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' }>
                                            <li class="link">
                                                <a href="components/AutoPlotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutoPlotComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IsotopologuePlotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsotopologuePlotComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NonConformityPlotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NonConformityPlotComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlotComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' : 'data-target="#xs-injectables-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' :
                                        'id="xs-injectables-links-module-PlotsModule-ef38d34c52388eb381064fb44f876e03"' }>
                                        <li class="link">
                                            <a href="injectables/DataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlotService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlotService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WebsocketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WebsocketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoutingModule.html" data-type="entity-link">RoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-ff94c4f95b5c96b58bd96fab01e5d29d"' : 'data-target="#xs-pipes-links-module-SharedModule-ff94c4f95b5c96b58bd96fab01e5d29d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-ff94c4f95b5c96b58bd96fab01e5d29d"' :
                                            'id="xs-pipes-links-module-SharedModule-ff94c4f95b5c96b58bd96fab01e5d29d"' }>
                                            <li class="link">
                                                <a href="pipes/ChartFilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartFilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/CvFilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CvFilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModulesModule.html" data-type="entity-link">SharedModulesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModulesModule-1305ce768c355cc10438000b002dc7e9"' : 'data-target="#xs-components-links-module-SharedModulesModule-1305ce768c355cc10438000b002dc7e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModulesModule-1305ce768c355cc10438000b002dc7e9"' :
                                            'id="xs-components-links-module-SharedModulesModule-1305ce768c355cc10438000b002dc7e9"' }>
                                            <li class="link">
                                                <a href="components/CategorySelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategorySelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TraceColorPickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TraceColorPickerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsModule.html" data-type="entity-link">StatisticsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' : 'data-target="#xs-components-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' :
                                            'id="xs-components-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' }>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NonConformitiesInformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NonConformitiesInformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NonConformitiesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NonConformitiesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NonConformitiesSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NonConformitiesSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' : 'data-target="#xs-injectables-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' :
                                        'id="xs-injectables-links-module-StatisticsModule-a39a683961e7408aead6065431736138"' }>
                                        <li class="link">
                                            <a href="injectables/ThresholdNonConformityService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThresholdNonConformityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsRouterModule.html" data-type="entity-link">StatisticsRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ViewBuilderModule.html" data-type="entity-link">ViewBuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' : 'data-target="#xs-components-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' :
                                            'id="xs-components-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' }>
                                            <li class="link">
                                                <a href="components/SampleTypeLabSystemSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SampleTypeLabSystemSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewMainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' : 'data-target="#xs-injectables-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' :
                                        'id="xs-injectables-links-module-ViewBuilderModule-6d009e61d4fc511df0cb3d17f2e722c9"' }>
                                        <li class="link">
                                            <a href="injectables/ChartService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CvService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CvService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SampleTypeCategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SampleTypeCategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CvSelectorComponent-1.html" data-type="entity-link">CvSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent-2.html" data-type="entity-link">MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainGuideSetComponent-1.html" data-type="entity-link">MainGuideSetComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainNonConformitiesComponent-1.html" data-type="entity-link">MainNonConformitiesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainThresholdComponent-1.html" data-type="entity-link">MainThresholdComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent-2.html" data-type="entity-link">SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThresholdListComponent-1.html" data-type="entity-link">ThresholdListComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Alert.html" data-type="entity-link">Alert</a>
                            </li>
                            <li class="link">
                                <a href="classes/Annotation.html" data-type="entity-link">Annotation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Authority.html" data-type="entity-link">Authority</a>
                            </li>
                            <li class="link">
                                <a href="classes/AutomaticGuideSet.html" data-type="entity-link">AutomaticGuideSet</a>
                            </li>
                            <li class="link">
                                <a href="classes/BottomModal.html" data-type="entity-link">BottomModal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Chart.html" data-type="entity-link">Chart</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChartParam.html" data-type="entity-link">ChartParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContextSource.html" data-type="entity-link">ContextSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContextSourceCategory.html" data-type="entity-link">ContextSourceCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/CV.html" data-type="entity-link">CV</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataSource.html" data-type="entity-link">DataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Display.html" data-type="entity-link">Display</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link">File</a>
                            </li>
                            <li class="link">
                                <a href="classes/GuideSet.html" data-type="entity-link">GuideSet</a>
                            </li>
                            <li class="link">
                                <a href="classes/GuideSetContextSourceStatus.html" data-type="entity-link">GuideSetContextSourceStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/HtmlPlotComponent.html" data-type="entity-link">HtmlPlotComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/InstrumentSample.html" data-type="entity-link">InstrumentSample</a>
                            </li>
                            <li class="link">
                                <a href="classes/Isotopologue.html" data-type="entity-link">Isotopologue</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabSystemStatus.html" data-type="entity-link">LabSystemStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabSystemThreshold.html" data-type="entity-link">LabSystemThreshold</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/MiniData.html" data-type="entity-link">MiniData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Modal.html" data-type="entity-link">Modal</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModalResponse.html" data-type="entity-link">ModalResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Node.html" data-type="entity-link">Node</a>
                            </li>
                            <li class="link">
                                <a href="classes/NodeLabSystemStatus.html" data-type="entity-link">NodeLabSystemStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/Param.html" data-type="entity-link">Param</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidator.html" data-type="entity-link">PasswordValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Peptide.html" data-type="entity-link">Peptide</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlotThreshold.html" data-type="entity-link">PlotThreshold</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlotTrace.html" data-type="entity-link">PlotTrace</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlotTracePoint.html" data-type="entity-link">PlotTracePoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/SampleComposition.html" data-type="entity-link">SampleComposition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SampleType.html" data-type="entity-link">SampleType</a>
                            </li>
                            <li class="link">
                                <a href="classes/SampleTypeCategory.html" data-type="entity-link">SampleTypeCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/System.html" data-type="entity-link">System</a>
                            </li>
                            <li class="link">
                                <a href="classes/Threshold.html" data-type="entity-link">Threshold</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThresholdConstraint.html" data-type="entity-link">ThresholdConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThresholdNonConformity.html" data-type="entity-link">ThresholdNonConformity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThresholdParam.html" data-type="entity-link">ThresholdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/TraceColor.html" data-type="entity-link">TraceColor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Troubleshooting.html" data-type="entity-link">Troubleshooting</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserChart.html" data-type="entity-link">UserChart</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDefaultView.html" data-type="entity-link">UserDefaultView</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserView.html" data-type="entity-link">UserView</a>
                            </li>
                            <li class="link">
                                <a href="classes/View.html" data-type="entity-link">View</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewDisplay.html" data-type="entity-link">ViewDisplay</a>
                            </li>
                            <li class="link">
                                <a href="classes/WebSocketNotification.html" data-type="entity-link">WebSocketNotification</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link">MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NonConformityService.html" data-type="entity-link">NonConformityService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuardService.html" data-type="entity-link">RoleGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ItemList.html" data-type="entity-link">ItemList</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});