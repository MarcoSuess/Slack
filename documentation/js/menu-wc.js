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
                    <a href="index.html" data-type="index-link">slack documentation</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' : 'data-target="#xs-components-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' :
                                            'id="xs-components-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogChannelSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogChannelSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogChatImageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogChatImageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogCreateChannelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogCreateChannelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogDataprotectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDataprotectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogLegalnoticeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogLegalnoticeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogProfileSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogProfileSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogUserStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogUserStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThreadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThreadComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' : 'data-target="#xs-injectables-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' :
                                        'id="xs-injectables-links-module-AppModule-e6315598f591236e6c035abfbd2fb58012e93b15a54c3cc88e9a6c2115547c98263fc919b21782b1482d4d1d9923a6aec592fa4e39c4ee21deb1b9114ad016ae"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SideNavService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Chat.html" data-type="entity-link" >Chat</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
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
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CloudstorageService.html" data-type="entity-link" >CloudstorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SideNavService.html" data-type="entity-link" >SideNavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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