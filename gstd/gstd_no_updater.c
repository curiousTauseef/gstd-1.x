/*
 * Gstreamer Daemon - Gst Launch under steroids
 * Copyright (C) 2017 RidgeRun Engineering <support@ridgerun.com>
 *
 * This file is part of Gstd.
 *
 * Gstd is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Gstd is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Gstd.  If not, see <http://www.gnu.org/licenses/>.
 */

#include "gstd_no_updater.h"

/* Gstd Core debugging category */
GST_DEBUG_CATEGORY_STATIC (gstd_no_updater_debug);
#define GST_CAT_DEFAULT gstd_no_updater_debug

#define GSTD_DEBUG_DEFAULT_LEVEL GST_LEVEL_INFO

static GstdReturnCode gstd_no_updater_update (GstdIUpdater * iface, GstdObject * object, const gchar * value);

typedef struct _GstdNoUpdaterClass GstdNoUpdaterClass;

/**
 * GstdNoUpdater:
 * A wrapper for the conventional no_updater
 */
struct _GstdNoUpdater
{
  GObject parent;
};

struct _GstdNoUpdaterClass
{
  GObjectClass parent_class;
};

static void
gstd_iupdater_interface_init (GstdIUpdaterInterface * iface)
{
  iface->update = gstd_no_updater_update;
}

G_DEFINE_TYPE_WITH_CODE (GstdNoUpdater, gstd_no_updater, G_TYPE_OBJECT,
    G_IMPLEMENT_INTERFACE (GSTD_TYPE_IUPDATER, gstd_iupdater_interface_init));

static void
gstd_no_updater_class_init (GstdNoUpdaterClass * klass)
{
  guint debug_color;

  /* Initialize debug category with nice colors */
  debug_color = GST_DEBUG_FG_BLACK | GST_DEBUG_BOLD | GST_DEBUG_BG_WHITE;
  GST_DEBUG_CATEGORY_INIT (gstd_no_updater_debug, "gstdnoupdater", debug_color,
      "Gstd No Updater category");
}

static void
gstd_no_updater_init (GstdNoUpdater * self)
{
  GST_INFO_OBJECT (self, "Initializing no updater");
}

static GstdReturnCode
gstd_no_updater_update (GstdIUpdater * iface, GstdObject * object, const gchar * value)
{
  GST_ERROR_OBJECT (iface, "This resource is not writable");
  return GSTD_NO_UPDATE;
}