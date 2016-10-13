<?php

class Brivium_ViewMembersList_EventListeners_Listener extends Brivium_BriviumLibrary_EventListeners
{

    public static function loadClassController ($class, array &$extend)
    {
        switch ($class) {
            case 'XenForo_ControllerPublic_Member':
                $extend[] = 'Brivium_ViewMembersList_ControllerPublic_Member';
                break;
        }
    }


    public static function templateHook ($hookName, &$contents, 
            array $hookParams, XenForo_Template_Abstract $template)
    {
        self::_templateHook($hookName, $contents, $hookParams, $template);
    }
}